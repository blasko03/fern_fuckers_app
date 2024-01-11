docker buildx build . -f ./backend/.docker/Dockerfile \
               -t blasko/fern_fuckers_app_backend:1.0.1 \
               --platform linux/arm64 \
               --push
docker buildx build frontend -f ./frontend/.docker/Dockerfile \
               -t blasko/fern_fuckers_app_frontend:1.0.3 \
               --platform linux/arm64 \
               --push