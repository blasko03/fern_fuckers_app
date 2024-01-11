FROM mcr.microsoft.com/dotnet/sdk:8.0 as dev
WORKDIR /source

FROM dev as build
COPY . .
RUN dotnet publish -c Release -o /published

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS prod
WORKDIR /app
COPY --from=build /published ./
ENTRYPOINT ["dotnet", "fern_fuckers_app_backend.dll"]