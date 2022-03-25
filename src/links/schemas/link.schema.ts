import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type LinkDocument = Link & Document;

@Schema({ timestamps: true })
export class Link {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({ unique: true })
  link: string;

  @Prop()
  long_url: string;

  @Prop()
  is_active: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
