FROM node:18

COPY . /app/

WORKDIR /app/

RUN rm -r node_modules/

RUN npm install

EXPOSE 3000

CMD npm run dev