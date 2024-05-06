import { Entry } from '../models/entries.js';

const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({});
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getEntries };
