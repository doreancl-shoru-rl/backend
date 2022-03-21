import * as mongoose from 'mongoose';

export const LinkSchema = new mongoose.Schema({
  id: String,
  title: String,
  link: String,
  long_url: String,
  is_active: Boolean,
  created_at: String,
});
