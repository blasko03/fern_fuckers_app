FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 as dev
ARG TARGETARCH
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install --global dotnet-ef
WORKDIR /source
ENTRYPOINT ["dotnet"]
CMD ["watch", "run"]

FROM dev as build
COPY . .
RUN dotnet nuget locals all --clear
RUN dotnet restore -a $TARGETARCH
RUN dotnet publish -c Release -o /published -a $TARGETARCH

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS prod
RUN dotnet tool install --global dotnet-ef
ENV PATH $PATH:/root/.dotnet/tools
WORKDIR /source
COPY . .
COPY --from=build /published /app
ENTRYPOINT ["dotnet"]
CMD ["/app/fern_fuckers_app_backend.dll"]