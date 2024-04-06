import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtenteModule } from './modules/utente.module';

@Module({
  imports: [UtenteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
