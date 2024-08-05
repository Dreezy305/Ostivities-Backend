import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SessionModule } from './session/session.module';
import { TicketModule } from './ticket/ticket.module';
import { SettleAccountsModule } from './settle_accounts/settle_accounts.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    EventModule,
    SessionModule,
    TicketModule,
    FileUploadModule,
    MulterModule.register({ dest: './upload' }),
    SettleAccountsModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
