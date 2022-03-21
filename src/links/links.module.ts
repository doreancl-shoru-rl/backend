import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { DatabaseModule } from '../database/database.module';
import { linksProviders } from './links.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LinksController],
  providers: [LinksService, ...linksProviders],
})
export class LinksModule {}
