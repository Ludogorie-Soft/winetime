FROM node:18.8-alpine as base

ENV NEXT_PUBLIC_SERVER_URL=https://winetime.bg

FROM base as builder

ENV DATABASE_URI=mongodb+srv://faxyhitz1:uGG4mN3Ha9oXTHa1@winetime-dev.yg5hkzw.mongodb.net/?retryWrites=true&w=majority&authSource=admin
ENV PAYLOAD_SECRET=89c01fd4-ed35-4d5c-b165-6e4372513702

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app
COPY package*.json  ./
COPY yarn.lock ./

RUN yarn install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]