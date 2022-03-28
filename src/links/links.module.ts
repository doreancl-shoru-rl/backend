import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { Linka, LinkSchema } from './schemas/link.schema';
import { Stat, StatSchema } from './schemas/stat.schema';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Linka.name, schema: LinkSchema }]),
    MongooseModule.forFeature([{ name: Stat.name, schema: StatSchema }]),
    CacheModule.register(),
  ],
  controllers: [LinksController, StatsController],
  providers: [LinksService, StatsService],
})
export class LinksModule {}
