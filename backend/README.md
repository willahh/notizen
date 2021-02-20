<p align="center">
  <a href="../documents/images/github-logo.png">
    <img src="../documents/images/github-logo.png" alt="Logo" width="200" >
  </a>
  <h1 align="center">Notizen backend</h1>
  <p align="center">
    Store and sync your notes across all your devices
  </p>
</p>

## Description
Backend REST API.

Built with [Nest](https://github.com/nestjs/nest) and [TypeORM](https://typeorm.io) with the following steps : 
```sh
# Install the Nestjs cli globally
sudo npm i -g @nestjs/cli

# Initialize Nestjs project
nest init 

# Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
npm i dotenv

# Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms.
# It is used by DTO objects.
npm i class-validator 

# Class-transformer allows you to transform plain object to some instance of class and versa.
npm i class-transformer 

# TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework.
npm i typeorm 

# Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
npm i pg 

# Mapped Types module for Nest used by the @nestjs/graphql and @nestjs/swagger packages.
npm i @nestjs/mapped-types 

# TypeORM module for Nest. 
npm i @nestjs/typeorm 

# Configuration module for Nest based on the dotenv (to load process environment variables) package.
npm i @nestjs/config

# nestjs common stuff
npm i @nestjs/common

## Exemple of the notes module initialization via the cli :

# 1. Generate the notes module
nest generate module notes

# 2. Generate notes controller
nest generate controller notes

# 3. Generate notes service
nest generate service notes

# 4. Generate note Entity
nest g class notes/note.entity --no-spec 

# 5. Generate CreateNoteDTO
nest g class notes/create-note.dto --no-spec

# 6. Generate UpdateNoteDTO
nest g class notes/update-note.dto --no-spec

# 7. Generate pagination-query DTO
nest generate class common/dto/pagination-query.dto --no-spec 

```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration
Migration is managed by Nest.
```sh
# TODO
```


## License

Distributed under the MIT License. See `LICENSE` for more information.



## Contact

William Ravel - [@twitter](https://twitter.com/willahhravel)

Project Link: [https://github.com/willahh/notizen](https://github.com/willahh/notizen)
