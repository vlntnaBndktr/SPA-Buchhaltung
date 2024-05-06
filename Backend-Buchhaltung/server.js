import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import HttpError from './models/http-errors.js';

import router from './routes/router.js';

import { Entry } from './models/entries.js';

dotenv.config();

// Entweder / oder ||
const PORT = process.env.PORT || 5000;

// 1. Konfiguration bzw. grundlegende Eistellungen der Express-App:
// Express ersetzt hier http von NodeJS
const app = express();

// sichert den Server ab
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
  })
);

// verhindert CORS Probleme im Browser bei API-Aufruf
app.use(cors());

// Form body parser
app.use(express.urlencoded({ extended: true }));

// JSON parser
app.use(express.json());

// 2. Definiere die Haupt-Route:
// Ausgabe an den Client
app.get('/', (req, res) => {
  res.send('Root wurde aufgerufen');
});

// 3. Verteilt alle Anfragen die mit /api beginnen an die Routen:
app.use('/api', router);

// 4. zentrale Fehlerbehanldung
app.use((req) => {
  throw new HttpError('Could not found route: ' + req.originalUrl, 404);
});

app.use((error, req, res, next) => {
  // wenn bereits ein Header gesetzt wurde, keinen response senden sondern einfach weiterschalten
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.errorCode || 500)
    .json({ message: error.message || 'Unknow error' });
});

// 5. Verbinde den Server mit der MongoDB-Datenbank:
const CONNECTION_STRING = `mongodb+srv://benediktervalentina:${process.env.MONGODB_PASSWORD}@buchhaltung-backend.um8jz2i.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    // Webserver wird gestartet
    app.listen(PORT, () => {
      console.log('Express Server läuft unter http://localhost:' + PORT);
    });
  })
  .catch((error) => {
    console.log('Verbindung MongoDB nicht möglich!', error);
  });

// Annahme: EntryID ist die ID eines vorhandenen Eintrags
const EntryId = '657975abf6099d84bf4089fa'; // Beispiel-Entry-ID

const entry = await Entry.findById(EntryId).populate('category');

console.log(entry);
