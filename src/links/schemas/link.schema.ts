import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

@Schema({ timestamps: true })
export class Link {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  title: string;

  @Prop({ index: true, unique: true })
  link: string;

  @Prop()
  long_url: string;

  @Prop()
  is_active: boolean;
}

export type LinkDocument = Link & Document;
export const LinkSchema = SchemaFactory.createForClass(Link);
