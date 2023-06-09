# Optimizely Content Graph - Decoupled site using ReactJs with create-react-app script

This sample site demonstrates one approach to render Optimizely content in a client side framework that is using client side routing for navigation with a working On-Page Edit (OPE) mode in the Optimizely UI, where the frontend and backend are hosted as separate apps.

The frontend app uses [React Js](https://reactjs.org/) to create and generate Graphql queries. Most of the techniques are framework agnostic and can be used with any other framework, such as Vue or Angular.

Content is fetched from Optimizely using the Content Graph: https://docs.developers.optimizely.com/digital-experience-platform/v1.4.0-content-graph/docs  

## Features demonstrated in this sample code

- On page editing (OPE) feature, with OIDC integration using Optimizely OpenIDConnect server hosted in the same host as the CMS site.  
- Search feature using ContentGraph.
    - Full text search of contents.
    - Filter by content type (artist or others).
    - Pagination.
    - Sorting.
    - Boosting.

## Prerequisites

This project uses:
* Node.js 16.8.1

## Setup and Run

1. Follow the README file to setup the Music Festival backend site and run the site on port 8082.  
2. Config the Content Graph key:   
    * ./.env

3. In the backend site, configure the React site as another host on port 3000 if you have not done so.
        ```
            Name: MusicFestival.Backend
            URL: http://localhost:8082
            Start page: Root > Start
            Host names
                localhost:8082 - Edit
                localhost:3000 - Primary
        ```
    * Run the job `Content Graph content synchronization job` to index whole contents into the Content Graph for the first time if you have not done so.  
    
4. Open terminal for `./MusicFestivalReactScriptFrontend`.
    * Run `npm install` or `yarn` (only needed in first run) to install dependencies.  
    * Run `npm run generate:local` or `yarn generate:local` to generate typescript code from GraphQL queries.
    * Run `npm start` or `yarn start`.
    * Navigate to http://localhost:3000/ to browse the site as a public visitor.

5. From backend site, navigate to CMS UI at http://localhost:8082/episerver/cms , login if prompted.
6. From the frontend site, click login on the top right corner.
7. Go back to the backend site, open a page for editing, you will see the React frontend site is displayed for editing, and you can click on properties to edit them directly on the site.  

## Notes

### Frontend structures

* `MusicFestivalReactScriptFrontend/src`
    - `...`
    - `components/`   contains common components.
    - `graphql/` contains queries using to retrieve contents from Content Graph. After updating queries, re-generate the code gen by command `npm run generate:local` at `MusicFestivalReactScriptFrontend` folder
    - `helpers/`
        - `contentSavedEvent.ts` function that subcribes changes from CMS
        - `...`
    - `models/` contains models retrieving messages from CMS
    - `pages/` contains all pages of the site
    - `authService.js` contains OIDC config
    - `generated.ts` is generated file on folder `graphql/`
    - `...`

### On-Page Editing

* To make a field editable, just add `data-epi-edit="FIELD_NAME"` attribute on the tag. Eg: `<h1 data-epi-edit="ArtistName">{content?.ArtistName}</h1>`

### Use Content Definitions
We can use Content Definitions JS SDK to pull / push manifest.json as usual. The changes would be synced automatically into ContentGraph.  
Use two convenient commands (in `package.json`) to work with the SDK.  
* Pulling manifest: `npm run content-definitions:pull`
* Push manifest: `npm run content-definitions:push`

To use more options of the SDK, please click [here](https://www.npmjs.com/package/@episerver/content-definitions).  

>*Note: When running the commands, please update the folder permission if you face with Permission denied issue on folder `[RootPath]/decoupled-site/MusicFestivalReactScriptFrontend/node_modules/.bin/content-definitions`*  

After updating contentTypes, we need to  
1. Wait until the contentTypes would be synced into Content Graph (By checking schema at the [address](http://localhost:8082/EPiServer/ContentGraph/GraphiQL)).  
2. Update graphql queries (at `graphql/` folder) matching with the changes we made to content types, as neccessary.  
3. Run `npm run generate:local` at `MusicFestivalReactScriptFrontend` root folder to re-generate types in file `generated.ts`.  
4. Finally, we could update the views in `.tsx` files to match with the changes to the schema.  

### More information on OPE
Read more on on page editing feature with ContentGraph and Optimizely CMS 12 at https://docs.developers.optimizely.com/digital-experience-platform/v1.4.0-content-graph/docs/on-page-editing-using-content-graph