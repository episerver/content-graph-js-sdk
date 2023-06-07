# Music Festival backend site
This is the backend site used to demonstrate On Page Editing feature with decoupled delivery site built with create-react-app script.  
The backend site is built using Optimizely CMS 12 with ContentGraph integration packages installed.  
You also need to run the react-script version of the frontend site in order to try out the on page editing feature.  

## Prerequisites
This project uses:
* NET6.0
* SQL Server 2016 Express LocalDB ([download here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)). On macOS, we can use Azure SQL Edge instead ([Link](https://learn.microsoft.com/en-us/azure/azure-sql-edge/disconnected-deployment))

## Setup and Run

1. On Windows, run `setup.cmd`. You can re-run `setup.cmd` at any time to reset the backend with a fresh database.
    * On Mac OS or linux, run `setup.sh` to setup blobs for backend site.
    * If you are on MacOS, follow the guide below to setup database in an Azure SQL Edge container.  
2. Config the Content Graph keys:   
    * ./backend/appsettings.json  
    * Set "FRONT_END_URI" to "http://localhost:3000" which is the frontend site you will run later.  

3. Setup your database server, on Windows you can use LocalDB and no setup is required, on MacOS, please refer to the section below to setup the DB in MacOS.   

3. Open terminal for `./backend` and run `dotnet run`.
    * Navigate to http://localhost:8082/.
    * Create an admin user. If the UI is not displayed automatically, navigate to http://localhost:8082/util/register.
    * Add the following config site if it doesn't exist
        ```
            Name: MusicFestival.Backend
            URL: http://localhost:8082
            Start page: Root > Start
            Host names
                localhost:8082 - Edit
                localhost:3000 - Primary
        ```
    * Run the job `Content Graph content synchronization job` to index whole contents into the Content Graph for the first time  
    
4. Afterwards, please follow the README for react-script frontend site to set it up. You can also run the Next.js version of the Music Festival frontend site.  

## DB configurations

### Database connection string
* backend/startup.cs is designed so that the site can start right away on both Windows and MacOS.
* You can also update your database connection string in backend/appsettings.json.
* The backend is quite the same with the backend of the [content-delivery-js-sk](https://github.com/episerver/content-delivery-js-sdk/tree/master/samples/music-festival-vue-decoupled) except using Content Graph `services.AddContentGraph(_configuration, OpenIDConnectOptionsDefaults.AuthenticationScheme);`.

### Create database on MacOS using Azure SQL Edge on Docker
On MacOS, you cannot run SQL Server, an alternative is to run an Azure SQL Edge container in Docker.  

* Run the following commands to start the container
```
docker run -e 'ACCEPT_EULA=1'-e 'MSSQL_SA_PASSWORD=Admin123! -p 1433:1433 --name azuresqledge -d mcr.microsoft.com/azure-sql-edge  
```
* Run `docker cp db.mdf azuresqledge:/var/opt/mssql/data/musicfestival.mdf` at `backend/App_Data` folder to copy the database file to the container.  
* Update the file permission in the container  
Run a terminal inside the AzureSQLEdge container
```
    docker exec -it --user root azuresqledge bash
```

Then in the shell, change the file owner user and group
```
    chown mssql:root /var/opt/mssql/data/musicfestival.mdf
```
* Use [Azure Data Studio](https://learn.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16#download-azure-data-studio) to connect to database and execute the query below to create database  
`CREATE DATABASE MusicFestival  ON (FILENAME = '/var/opt/mssql/data/musicfestival.mdf') FOR ATTACH;`
* Then the backend should be able to connect to the database running in the SQL instance inside the container.  