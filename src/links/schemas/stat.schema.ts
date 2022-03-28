import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema({ strict: false })
export class Stat {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true })
  link: string;

  @Prop({ type: Number, required: true, default: 0 })
  count?: number;

  //@Prop({ type: Number, required: true, unique: true })
  @Prop({ type: Number, required: true })
  time: number;
}

export type StatDocument = Stat & Document;
export const StatSchema = SchemaFactory.createForClass(Stat);
