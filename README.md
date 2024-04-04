# esercizio_ristorante
 studio per NestJS, Prisma e React

### Per il microservizio postgres-admin:
Questo microservizio è praticamente il "phpmyadmin" per postgres. Permette di avere una UI per interfacciarsi col server.

Andare all'indirizzo <host>:5050 (nel mio caso, **localhost:5050**) e autenticarsi con le informazioni nel file .env.

Per la connessione -> Servers > registrati > server > digita un nome  e passa alla tab "connessione" > indirizzo host (che puoi ottenere col comando **docker inspect <nome_container_postgres-db>** ) > porta 5432 > nome utente e password sono quelle nel file .env