FROM node:20-slim as dev
WORKDIR /source
RUN npx next telemetry disable

FROM dev as build
WORKDIR /source
COPY . .
RUN yarn
RUN yarn build

FROM  node:20-slim as prod
WORKDIR /app

RUN yarn add next
COPY --from=build /source/.next .next
COPY --from=build /source/package.json .
COPY --from=build /source/package-lock.json .

ENTRYPOINT [ "yarn" ] 
CMD ["start"]