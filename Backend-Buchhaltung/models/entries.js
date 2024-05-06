import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const entriesSchema = new Schema({
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, required: true, ref: 'Category' }, // = ID der jeweiligen Kategorie
  amount: { type: Number, required: true },
});

export const Entry = mongoose.model('Entry', entriesSchema);
