# Optimizely Content Graph - Decoupled

This sample site demonstrates one approach to render Optimizely content in a client side framework that is using client side routing for navigation with a working On-Page Edit (OPE) mode in the Optimizely UI, where the frontend and backend are hosted as separate apps.

The frontend app uses [React Js](https://reactjs.org/) to create and generate Graphql queries. Most of the techniques are framework agnostic and can be used with any other framework, such as Vue or Angular.

Content is fetched from Optimizely using the Content Graph: https://docs.developers.optimizely.com/digital-experience-platform/v1.4.0-content-graph/docs
## Prerequisites

This project uses:
* Node.js 16.8.1
* NET6.0
* SQL Server 2016 Express LocalDB ([download here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)). On macOS, we can use Azure SQL Edge instead ([Link](https://learn.microsoft.com/en-us/azure/azure-sql-edge/disconnected-deployment))

## Setup and Run

1. Run `setup.cmd`. You can re-run `setup.cmd` at any time to reset the backend with a fresh database.
2. Config the Content Graph keys:   
    * ./backend/appsettings.json
    * ./frontend/.env
    * ./frontend/codegen.yaml

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
    
4. Open terminal for `./frontend` and run `npm install` (only needed first run).
    * Run `npm start`.
    * Navigate to http://localhost:3000/.

## Notes

### Frontend structures

* `frontend/src`
    - `...`
    - `components/`   contains common components.
    - `graphql/` contains queries using to retrieve contents from Content Graph. After updating queries, re-generate the code gen by command `npm run generate:local` at `frontend` folder
    - `helpers/`
        - `contentSavedEvent.ts` function that subcribes changes from CMS
        - `...`
    - `models/` contains models retrieving messages from CMS
    - `pages/` contains all pages of the site
    - `authService.js` contains OIDC config
    - `generated.ts` is generated file on folder `graphql/`
    - `...`

### Database connection string
* backend/startup.cs is designed so that the site can start right away on both Windows and MacOS.
* You can also update your database connection string in backend/appsettings.json.
* The backend is quite the same with the backend of the [content-delivery-js-sk](https://github.com/episerver/content-delivery-js-sdk/tree/master/samples/music-festival-vue-decoupled) except using Content Graph `services.AddContentGraph(_configuration, OpenIDConnectOptionsDefaults.AuthenticationScheme);`.

### On-Page Editing

* To make a field editable, just add `data-epi-edit="FIELD_NAME"` attribute on the tag. Eg: `<h1 data-epi-edit="ArtistName">{content?.ArtistName}</h1>`

### Create database on MacOS using Azure SQL Edge on Docker

* Run `docker cp db.mdf azuresqledge:/var/opt/mssql/data/musicfestival.mdf` at `backend/App_Data` folder
* Update the file permission in the container  
Run a terminal inside the AzureSQLEdge container
```
    docker exec -it --user root <container-id of AzureSQLEdge> bash
```

Then in the shell, change the file owner user and group
```
    chown mssql:root /var/opt/mssql/data/musicfestival.mdf
```
* Use [Azure Data Studio](https://learn.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16#download-azure-data-studio) to connect to database and execute the query below to create database  
`CREATE DATABASE MusicFestival  ON (FILENAME = '/var/opt/mssql/data/musicfestival.mdf') FOR ATTACH;`

### Use Content Definitions
We can use Content Definitions JS SDK to pull / push manifest.json as usual. The changes would be synced automatically into ContentGraph.  
Use two convenient commands (in `package.json`) to work with the SDK.  
* Pulling manifest: `npm run content-definitions:pull`
* Push manifest: `npm run content-definitions:push`

To use more options of the SDK, please click [here](https://www.npmjs.com/package/@episerver/content-definitions).  

>*Note: When running the commands, please update the folder permission if you face with Permission denied issue on folder `[RootPath]/decoupled-site/frontend/node_modules/.bin/content-definitions`*  

After updating contentTypes, we need to  
1. Wait until the contentTypes would be synced into Content Graph (By checking schema at the [address](http://localhost:8082/EPiServer/ContentGraph/GraphiQL)).  
2. Update graphql queries (at `graphql/` folder) matching with the changes we made to content types, as neccessary.  
3. Run `npm run generate:local` at `frontend` root folder to re-generate types in file `generated.ts`.  
4. Finally, we could update the views in `.tsx` files to match with the changes to the schema.  