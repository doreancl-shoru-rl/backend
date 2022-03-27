import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Linka, LinkSchema } from './link.schema';
import { Transform, Type } from 'class-transformer';

@Schema({ timestamps: true })
export class Stat {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: LinkSchema })
  @Type(() => Linka)
  link: string;

  @Prop({ type: Date, required: true })
  time: Date;
}

export type StatDocument = Stat & Document;
export const StatSchema = SchemaFactory.createForClass(Stat);
