import { PartialType } from '@nestjs/mapped-types';
import { CreateHolaDto } from './create-hola.dto';

export class UpdateHolaDto extends PartialType(CreateHolaDto) {}
