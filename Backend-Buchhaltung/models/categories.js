import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  name: { type: String, required: true },
});

// man kann auch einfach in der DB 4 Documents erstellen
const fixedCategories = ['Wohnung', 'Haushalt', 'Freizeit', 'Sonstiges'];

export const Category = mongoose.model('Category', categoriesSchema);
