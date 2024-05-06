import { Entry } from '../models/entries.js';

const createEntry = async (req, res) => {
  try {
    const { date, type, description, amount, category } = req.body;

    console.log(category);

    const newEntry = await Entry.create({
      date,
      type,
      description,
      amount,
      category,
    });
    res.status(201).json(newEntry); // 201 Schickt 'created'
    console.log(newEntry);
  } catch (error) {
    console.error('Fehler beim Erstellen des Eintrags:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createEntry };
