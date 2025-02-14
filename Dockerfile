FROM node:20-alpine

WORKDIR /home/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev 

EXPOSE 3000

CMD ["npm", "run", "dev"]
