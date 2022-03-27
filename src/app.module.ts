import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HolaModule } from './hola/hola.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'REMOVED',
    ),
    LinksModule,
    HolaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
