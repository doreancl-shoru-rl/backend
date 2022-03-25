import { Document } from 'mongoose';

export interface Link extends Document {
  id: string;
  title: string;
  link: string;
  long_url: string;
  is_active: boolean;
  created_at: string;
}
