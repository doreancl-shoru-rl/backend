import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HolaService } from './hola.service';
import { CreateHolaDto } from './dto/create-hola.dto';
import { UpdateHolaDto } from './dto/update-hola.dto';

@Controller('hola')
export class HolaController {
  constructor(private readonly holaService: HolaService) {}

  @Post()
  create(@Body() createHolaDto: CreateHolaDto) {
    return this.holaService.create(createHolaDto);
  }

  @Get()
  findAll() {
    return this.holaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolaDto: UpdateHolaDto) {
    return this.holaService.update(+id, updateHolaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holaService.remove(+id);
  }
}
