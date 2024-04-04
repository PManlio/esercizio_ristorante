-- CreateTable
CREATE TABLE "Utente" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Utente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ristorante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "indirizzo" TEXT NOT NULL,
    "tipo_cucina" TEXT[],
    "max_coperti" INTEGER NOT NULL,
    "fasce_orarie" TEXT[],

    CONSTRAINT "Ristorante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prenotazione" (
    "id" SERIAL NOT NULL,
    "id_prenotante" INTEGER NOT NULL,
    "id_ristorante" INTEGER NOT NULL,

    CONSTRAINT "Prenotazione_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utente_username_key" ON "Utente"("username");

-- AddForeignKey
ALTER TABLE "Prenotazione" ADD CONSTRAINT "Prenotazione_id_prenotante_fkey" FOREIGN KEY ("id_prenotante") REFERENCES "Utente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prenotazione" ADD CONSTRAINT "Prenotazione_id_ristorante_fkey" FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
