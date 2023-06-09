# Optimizely Content Graph samples

This repository contains the samples for the Content Graph.

## Content Graph

* [Documentation](https://docs.developers.optimizely.com/digital-experience-platform/v1.4.0-content-graph/docs)

## Samples

We have the following samples code, please check the README file of each sample for more details.
* [Music Festival backend site](MusicFestivalBackend/)
  * The site is used as backend for two other Music Festival frontend site.
* [React JS - Decoupled frontend site](MusicFestivalReactScriptFrontend/)
  * Demonstrates on page editing feature and multiple search functions.
* [Next JS - Decoupled frontend site](MusicFestivalNextJsFrontend/)
  * Demonstrates implementation using Next.js with deployment on the Vercel platform.  

## Prerequisites for building and running the samples

This project uses:
* Node.js 16.8.1
* NET6.0
* SQL Server 2016 Express LocalDB ([download here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads))

## Create a release

 1. Update the version in all modules with `npm version 1.2.3`.
 2. Run `npm install` in all samples to update their package-lock.json files.
 3. Commit, push, and create PR to `main` branch.
 4. Create new Github release based of `main` branch.
 5. Tag version with following format `v1.2.3`.
 6. Give the release a title and write an optional description.
 7. Publish.

## Contributing

The easiest way to contribute is to join in with the discussions on Github issues or create new issues with questions, suggestions or any other feedback. If you want to contribute code or documentation, you are more than welcome to create pull-requests, but make sure that you read the contribution page first.
