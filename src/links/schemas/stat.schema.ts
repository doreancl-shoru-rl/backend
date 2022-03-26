import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

export type StatDocument = Stat & Document;

@Schema({ timestamps: true })
export class Stat extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  link: string;

  @Prop()
  long_url: string;

  @Prop()
  is_active: boolean;
}

export const StatSchema = SchemaFactory.createForClass(Stat);
