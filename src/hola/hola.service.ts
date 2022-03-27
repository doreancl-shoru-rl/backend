import { Injectable } from '@nestjs/common';
import { CreateHolaDto } from './dto/create-hola.dto';
import { UpdateHolaDto } from './dto/update-hola.dto';

@Injectable()
export class HolaService {
  create(createHolaDto: CreateHolaDto) {
    return 'This action adds a new hola';
  }

  findAll() {
    return `This action returns all hola`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hola`;
  }

  update(id: number, updateHolaDto: UpdateHolaDto) {
    return `This action updates a #${id} hola`;
  }

  remove(id: number) {
    return `This action removes a #${id} hola`;
  }
}
