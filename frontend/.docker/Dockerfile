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
RUN npx next telemetry disable

COPY --from=build /source/./node_modules/next/dist/ ./node_modules/next/dist
COPY --from=build /source/.next .next
COPY --from=build /source/package.json .
COPY --from=build /source/package-lock.json .
ENV PATH="${PATH}:/source/./node_modules/next/dist/bin/next""

ENTRYPOINT [ "yarn" ] 
CMD ["start"]