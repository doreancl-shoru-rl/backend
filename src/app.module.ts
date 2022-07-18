import { CacheModule, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import { SheetModule } from './google/sheet/sheet.module';
import { SheetsService } from './google/sheet/sheets.service';
import { GmailModule } from './google/gmail/gmail.module';
import { GmailService } from './google/gmail/gmail.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        return {
          uri: `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    LinksModule,
    AuthModule,
    CacheModule.register(),
    UsersModule,
    SheetModule,
    GmailModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'info' : 'info',
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  translateTime: true,
                },
              }
            : undefined,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SheetsService, GmailService, Logger],
})
export class AppModule {}
