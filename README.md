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

1. cpsc-304-project\$ `cp .env.example .env`

1. Modify contents in `.env` to match your setup\
   `POSTGRES_USER=<custom role name>`\
   `POSTGRES_PASSWORD=<password for role>`\
   `POSTGRES_HOST=localhost`\
   `POSTGRES_DATABASE=<database name>`\
   `POSTGRES_PORT=5432` is the default, but if you changed it, change this

1. cpsc-304-project\$ `yarn`

1. `cd sql_scripts`\
   `source reset_tables.sh`

To start the project, in two terminals:

cpsc-304-project/ `cd server`

cpsc-304-project/server$ `yarn start`


cpsc-304-project/ `cd client`

cpsc-304-project/client$ `yarn start`

The client will run in localhost:5000, while the server runs in localhost:3000

Going to localhost:3000/ will load the last built files, 
for client hot reload go to localhost:3000

Additional Details:

- refer to `https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/` for more information