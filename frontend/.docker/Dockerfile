FROM node:20-slim as dev
WORKDIR /source
RUN npx next telemetry disable

FROM dev as prod
WORKDIR /app
COPY . .
RUN yarn build
ENTRYPOINT ["yarn", "start"]