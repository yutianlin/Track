## Postgres Tables CREATE

```
CREATE TABLE person( 
    person_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
	email TEXT,
    phone_number INT,
    in_app_notification BOOLEAN NOT NULL
);


```
