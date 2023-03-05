# Build image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore

RUN dotnet publish -c Release -o /out

COPY ./App_Data/DefaultSiteContent.episerverdata /out/App_Data/DefaultSiteContent.episerverdata
COPY ./App_Data/blobs_default /out/App_Data/blobs
COPY ./entrypoint.sh /out
COPY ./sshd_config /out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

WORKDIR /app

COPY --from=build /out .

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Start and enable SSH
RUN apt-get update \
    && apt-get install -y --no-install-recommends dialog \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd \
    && chmod u+x ./entrypoint.sh

COPY sshd_config /etc/ssh/

# Expose port 80 2222
EXPOSE 80 2222

#ENTRYPOINT ["dotnet", "MusicFestival.Backend.dll"]
ENTRYPOINT [ "./entrypoint.sh" ]
