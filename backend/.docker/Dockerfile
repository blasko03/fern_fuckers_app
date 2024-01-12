FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 as dev
ARG TARGETARCH
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install --global dotnet-ef
WORKDIR /source

FROM dev as build
COPY . .
RUN dotnet nuget locals all --clear
RUN dotnet restore -a $TARGETARCH
RUN dotnet publish -c Release -o /published -a $TARGETARCH

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS prod
RUN dotnet tool install --global dotnet-ef
ENV PATH $PATH:/root/.dotnet/tools
WORKDIR /app
COPY --from=build /published ./
ENTRYPOINT ["dotnet", "fern_fuckers_app_backend.dll"]
