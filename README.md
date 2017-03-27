[![Build Status](https://travis-ci.org/lekiert/quickstep-client.svg?branch=master)](https://travis-ci.org/lekiert/quickstep-client)

# Quickstep Client

This is a client application that consumes the [Quickstep Api](https://github.com/lekiert/quickstep-api). It has been designed to help language schools with setting up their own apps, where they can put tests and exercises for their students. Built with Angular 2.

Be aware that this project is still under development and certain parts of it will be rewritten. Also bear in mind that the UI language is Polish, however I intend to translate it later to English.

## Requirements
* node >= 6
* @angular/cli@1.0.0-rc.4 (`npm install -g @angular/cli@1.0.0-rc.4`)
* typescript@2.0.0 (`npm install -g  typescript@2.0.0`)

## Installation and first run
* Clone the repository to a desired location.
* run `npm install`
* run in the project's root directory `mv src/environments/environment.sample.ts src/environments/environment.ts`
* provide your API instance URL in the src/environments/environment.ts
* run `ng serve`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

`ng test`

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## TODOs so far (list will extend)
* more test coverage
* table pagination
* pages
* student scoring 

