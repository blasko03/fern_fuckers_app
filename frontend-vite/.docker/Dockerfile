FROM --platform=$BUILDPLATFORM node:20-slim as dev
WORKDIR /source

ENTRYPOINT ["npm"]
CMD ["run", "dev"]

FROM dev as build
WORKDIR /source
COPY . .
RUN npm install
RUN npm run build

FROM  nginx:alpine as prod
WORKDIR /usr/share/nginx/html

COPY --from=build /source/dist .
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf