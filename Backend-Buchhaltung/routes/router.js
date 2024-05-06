import { Router } from 'express';
import { createEntry } from '../controllers/entries.js';
import { getCategories } from '../controllers/getCategories.js';
import { getEntries } from '../controllers/getEntries.js';

const router = new Router();

// Test-Route
router.get('/test', (req, res) => {
  res.send('Test ist erfolgreich :)');
});

// Routen:
router.post('/entry/create', createEntry);

router.get('/categories', getCategories);

router.get('/entries', getEntries);

export default router;
