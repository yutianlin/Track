# cpsc-304-project

To setup the project:

l. Install yarn, node.js, homebrew, npm

l. `brew install postgresql`

l. Setup Postgres Database on terminal (<variable> indicates a variable you could fill in)
`psql postgres`
postgres=# `CREATE ROLE <custom role name> WITH LOGIN PASSWORD '<password for role>';`
postgres=# `ALTER ROLE <custom role name> CREATEDB;`
postgres=# `\q`
`psql -d postgres -U <custom role name>`
postgres=> `CREATE DATABASE <database name>;`
postgres=> `\c <database name>`
<database name> =>
`CREATE TABLE users ( ID SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30) );`

l. cpsc-304-project\$ `cp .env.example .env`

l. Modify contents in `.env` to match your setup
`POSTGRES_USER=<custom role name>`
`POSTGRES_PASSWORD=<password for role>`
`POSTGRES_DATABASE=<database name>`
`POSTGRES_PORT=5432` is the default, but if you changed it, change this

l. cpsc-304-project\$ `yarn`

To start the project:

cpsc-304-project\$ `yarn start`

Additional Details:

- refer to `https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/` for more information
