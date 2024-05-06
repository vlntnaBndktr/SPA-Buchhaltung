import { Category } from '../models/categories.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, '_id name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getCategories };
