import { Module } from '@nestjs/common';
import { databaseProviders } from '../infra/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
