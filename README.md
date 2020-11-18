# cpsc-304-project

To setup the project:

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


Troubleshoot Suggestions:

* Make sure that your psql user has read write permissions

* If `yarn updateData` fails (you could tell on the console that some tables are not created or inserted properly) go to `sql_scripts` folder and run `source reset_tables.sh`. For this script to run, the `.env` file must be setup properly with your psql details.

* If anything relating yarn, Node.js, or npm is not working, please upgrade your version, for your reference, I am using yarn 1.22.5, node v10.22.0, npm 6.14.6

* If any of these commands are not working, take a look at the corresponding `package.json` file to see the command it is running, and you could always run them separately or run similar commands.

* Please note that we are using TypeScript, so you would have to compile your files before running, that should be done when you run `yarn start`, but if anything goes wrong, you could manually compile the files and run it. If there are still problems, try deleting your `dist/` folder and recompiling.

* You could access any of the endpoints on Postman or Curl if you prefer, but we do not have preloaded scripts for you to run.

* If Google and the link below has not been helpful in setting up your environment, please contact me ASAP by email at me@yutianlin.com

Additional Details:

- refer to `https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/` for more information
