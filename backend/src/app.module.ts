import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtenteModule } from './modules/utente.module';
import { RistoranteModule } from './modules/ristorante.module';
import { PrenotazioneModule } from './modules/prenotazione.module';

@Module({
  imports: [UtenteModule, RistoranteModule, PrenotazioneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
