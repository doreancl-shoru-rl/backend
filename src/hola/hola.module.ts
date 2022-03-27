import { Module } from '@nestjs/common';
import { HolaService } from './hola.service';
import { HolaController } from './hola.controller';

@Module({
  controllers: [HolaController],
  providers: [HolaService],
})
export class HolaModule {}
