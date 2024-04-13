FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN echo "${DATABASE_URL}" >> /app/.env

RUN npx prisma --migrate

RUN npx prisma db push

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000