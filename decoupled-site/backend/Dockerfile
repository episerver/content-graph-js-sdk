FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

WORKDIR /netcoreapp

COPY netcoreapp/ .

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Expose port 80
EXPOSE 80

ENTRYPOINT ["dotnet", "MusicFestival.Backend.dll"]