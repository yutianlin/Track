# Run this script to reset your postgres tables (drop all the project tables, create all the tables, and insert all values)
# We have to drop the table because our id's are all auto incrementing

# read .env
set -a
source .env
set +a

# remove all newlines
psql postgresql://${POSTGRES_USER//[$'\t\r\n']}:${POSTGRES_PASSWORD//[$'\t\r\n']}@${POSTGRES_HOST//[$'\t\r\n']}:${POSTGRES_PORT//[$'\t\r\n']}/${POSTGRES_DATABASE//[$'\t\r\n']} -f ./sql_scripts/drop_all_tables.sql
psql postgresql://${POSTGRES_USER//[$'\t\r\n']}:${POSTGRES_PASSWORD//[$'\t\r\n']}@${POSTGRES_HOST//[$'\t\r\n']}:${POSTGRES_PORT//[$'\t\r\n']}/${POSTGRES_DATABASE//[$'\t\r\n']} -f ./sql_scripts/create_tables.sql
psql postgresql://${POSTGRES_USER//[$'\t\r\n']}:${POSTGRES_PASSWORD//[$'\t\r\n']}@${POSTGRES_HOST//[$'\t\r\n']}:${POSTGRES_PORT//[$'\t\r\n']}/${POSTGRES_DATABASE//[$'\t\r\n']} -f ./sql_scripts/insert_values.sql