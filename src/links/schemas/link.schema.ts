import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema({ timestamps: true })
export class Link {
  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop()
  long_url: string;

  @Prop()
  is_active: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
