# TRACK

Track is a web app for UBC students keep everyone safe from COVID-19. It is used to track where they have been, what circle of acquaintances they have, and what classes they are taking. When someone they have potentially come in contact with contracts COVID-19, they would be notified so that they could take the necessary next steps to prevent further spread of the disease.

## Technical infrastructure of the project:

The project is separated into two main folders, the client as the front-end components visible to the user, and the server as the back-end components with a RESTful API design. This is why anything that could be done by the client, is also achievable by API calls to the server.

The tech stack that was used includes Node.js (Typescript), React, CSS, Postgresql. Additional tools including Insomnia, Prettier, Yarn, NPM, joi, React Bootstrap, Redux, Express.js were also used.


### Server

The entrance to the server is the `src/index.ts` file, it gives access to all the controllers (API endpoints). Each entity and relationship belongs in its own file in `src/`, with corresponding controller, schema (if necessary), service, and queries file. There are also additional folders named `src/joins` and `src/helpers` that supports any queries using multiple tables and helper functionalities (commonly used queries, tables column names as constants, parsers, etc.) respectively.

In the `src/` there are also commonly used errors in `src/errors.ts` and a `src/QueryService.ts` that communicates directly with the database. Please not that the QueryService will load all Postgres settings from the `.env` file, and will also log any queries that it processes on the console.

In the `sql_scripts` lives the scripts that automizes Postgres table creation and data insert.


### Client

The entrance to the client is the `src/index.tsx` which loads the app and associated router. The routes are loaded in the `src/App.tsx` file.

The querying to the backend is done by the different services in the `src/services` folder, where there is a file corresponding to each category of service e.g. `src/services/covid_test.service.ts` It includes an additional service that handles a simplistic authentication using a cookie that doesn't expire.

The `src/model` folder contains all the data models that will need to be used by the front-end. The `src/conversions` folder does the translation between the JSON that is returned by the API and the data model that is consumed.

All the react redux forms, CSS formatting, interaction are defined by category in the `src/features`.

## To setup the project:

1. Install yarn, node.js, homebrew, npm

1. `brew install postgresql`

1. Setup Postgres Database on terminal, (`<variable>` indicates a variable you could fill in)\
   `brew services start postgresql`\
   `psql postgres`\
   postgres=# `CREATE ROLE <custom role name> WITH LOGIN PASSWORD '<password for role>';`\
   postgres=# `ALTER ROLE <custom role name> CREATEDB;`\
   postgres=# `\q`\
   `psql -d postgres -U <custom role name>`\
   postgres=> `CREATE DATABASE <database name>;`\
   postgres=> `\c <database name>`\

1. cpsc-304-project/server\$ `cp .env.example .env`

1. Modify contents in `.env` to match your setup\
   `POSTGRES_USER=<custom role name>`\
   `POSTGRES_PASSWORD=<password for role>`\
   `POSTGRES_HOST=localhost`\
   `POSTGRES_DATABASE=<database name>`\
   `POSTGRES_PORT=5432` is the default, but if you changed it, change this

1. cpsc-304-project/server\$ `yarn`

1. cpsc-304-project/server\$ `yarn updateData`

1. cpsc-304-project/client\$ `yarn`

To access all service endpoints directly without client:

1. Install Insomnia

1. Import Insomnia.yaml file to Insomnia

1. cpsc-304-project/server$ `yarn start`

1. Run endpoints by clicking `Send` button

To start the project, in two terminals:

cpsc-304-project/server$ `yarn start`

cpsc-304-project/client$ `yarn start`

The client will run in localhost:5000, while the server runs in localhost:3000

Going to localhost:3000/ will load the last built files, 
for client hot reload go to localhost:3000


### Troubleshooting Suggestions:

* Make sure that your psql user has read write permissions

* If `yarn updateData` fails (you could tell on the console that some tables are not created or inserted properly) go to `sql_scripts` folder and run `source reset_tables.sh`. For this script to run, the `.env` file must be setup properly with your psql details.

* If anything relating yarn, Node.js, or npm is not working, please upgrade your version, for your reference, I am using yarn 1.22.5, node v10.22.0, npm 6.14.6

* If any of these commands are not working, take a look at the corresponding `package.json` file to see the command it is running, and you could always run them separately or run similar commands.

* Please note that we are using TypeScript, so you would have to compile your files before running, that should be done when you run `yarn start`, but if anything goes wrong, you could manually compile the files and run it. If there are still problems, try deleting your `dist/` folder and recompiling.

* You could access any of the endpoints on Postman or Curl if you prefer, but we do not have preloaded scripts for you to run.

* If Google and the link below has not been helpful in setting up your environment, please contact me ASAP by email at me@yutianlin.com

### Additional Details:

- refer to `https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/` for more information
