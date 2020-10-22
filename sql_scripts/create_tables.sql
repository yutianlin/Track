/*
 To run these queries:
 psql -d <database_name> -f <this_file_path>
 */

CREATE TABLE scheduled_class (
	scheduled_class_id serial PRIMARY KEY,
	start_day timestamp NOT NULL,
	end_day timestamp NOT NULL,
	class_name TEXT NOT NULL
);

CREATE TABLE postal_address(
	postal_code char(6) PRIMARY KEY,
	city varchar(100) NOT NULL,
	province char(2) NOT NULL
);

CREATE TABLE ubc_building(
	building_code varchar(10) PRIMARY KEY,
	name varchar(100) NOT NULL,
	postal_code varchar(6),
	building_number varchar(100) NOT NULL,
	street varchar(100) NOT NULL,
	FOREIGN KEY (postal_code) REFERENCES postal_address(postal_code)
	    ON DELETE SET NULL
);

CREATE TABLE room(
	room_number varchar(10),
	building_code varchar(4),
	room_type varchar(100) NOT NULL,
	PRIMARY KEY (room_number, building_code),
	FOREIGN KEY (building_code) REFERENCES ubc_building(building_code)
		ON DELETE CASCADE
);


CREATE TABLE class_day(
	scheduled_class_id int,
	class_day_id serial,
	day_of_week varchar(10) NOT NULL,
	room_number varchar(10),
	building_code varchar(10),
	PRIMARY KEY(scheduled_class_id, class_day_id),
	FOREIGN KEY(scheduled_class_id) REFERENCES scheduled_class
	    ON DELETE CASCADE,
    FOREIGN KEY (room_number, building_code) REFERENCES room(room_number, building_code)
);

CREATE TABLE entrance(
	entrance_code serial,
	room_number varchar(10),
	building_code varchar(4) NOT NULL,
	PRIMARY KEY (entrance_code),
	FOREIGN KEY (room_number, building_code) REFERENCES room(room_number, building_code),
	FOREIGN KEY (building_code) REFERENCES ubc_building(building_code)
);

CREATE TABLE bubble(
	bubble_id serial PRIMARY KEY,
	title varchar(100) NOT NULL,
	description varchar(100) NOT NULL
);

CREATE TABLE person(
    person_id serial PRIMARY KEY,
    name varchar (250) NOT NULL,
    email varchar (250),
    phone_number varchar(20),
    in_app_notification boolean NOT NULL,
    student_id varchar(30),
    faculty_id varchar(30),
    job_title varchar(100)
);

CREATE TABLE bubble_person(
	person_id integer,
	bubble_id integer,
	PRIMARY KEY (person_id, bubble_id),
	FOREIGN KEY (person_id) REFERENCES person(person_id)
	    ON DELETE CASCADE,
	FOREIGN KEY (bubble_id) REFERENCES bubble(bubble_id)
	    ON DELETE CASCADE
);

CREATE TABLE shared_bike(
	shared_bike_id varchar(100) PRIMARY KEY
);

CREATE TABLE covid_testing_centre(
	covid_testing_centre_id serial PRIMARY KEY,
	building_number varchar(250) NOT NULL,
	street_number varchar(250) NOT NULL,
	postal_code varchar(250) NOT NULL,
	name varchar(250) NOT NULL,
	FOREIGN KEY (postal_code) REFERENCES postal_address(postal_code)
	    ON DELETE SET NULL
);

CREATE TABLE covid_test(
	test_time timestamp,
	person_id integer,
	covid_testing_centre_id integer,
	status varchar(50) NOT NULL,
	PRIMARY KEY (test_time, person_id, covid_testing_centre_id),
	FOREIGN KEY (person_id) REFERENCES Person,
	FOREIGN KEY (covid_testing_centre_id) REFERENCES covid_testing_centre(covid_testing_centre_id)
	    ON DELETE CASCADE
);

CREATE TABLE person_time_entrance(
	person_id integer,
	start_date timestamp,
	entrance_code int,
	PRIMARY KEY (person_id, start_date, entrance_code),
	FOREIGN KEY (person_id) REFERENCES person(person_id)
	    ON DELETE CASCADE,
	FOREIGN KEY (entrance_code) REFERENCES entrance(entrance_code)
	    ON DELETE CASCADE
);

CREATE TABLE person_shared_bike(
	shared_bike_id varchar(100),
	person_id integer,
	rental_time timestamp NOT NULL,
	PRIMARY KEY(shared_bike_id, person_id),
	FOREIGN KEY (shared_bike_id) REFERENCES shared_bike(shared_bike_id)
	    ON DELETE CASCADE,
	FOREIGN KEY (person_id) REFERENCES person(person_id)
	    ON DELETE CASCADE
);

CREATE TABLE scheduled_class_person(
	scheduled_class_id integer,
	person_id integer,
	PRIMARY KEY (person_id, scheduled_class_id),
	FOREIGN KEY (person_id) REFERENCES person(person_id)
	    ON DELETE CASCADE,
	FOREIGN KEY (scheduled_class_id) REFERENCES scheduled_class(scheduled_class_id)
	    ON DELETE CASCADE
);

CREATE TABLE notification(
	notification_id serial PRIMARY KEY,
	category varchar(100),
	subject_line varchar(100),
	body varchar(100) NOT NULL
);

CREATE TABLE person_notification(
	notification_id integer,
	person_id integer,
	notification_time timestamp NOT NULL,
	PRIMARY KEY(notification_id, person_id),
	FOREIGN KEY (notification_id) REFERENCES notification(notification_id)
	    ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(person_id)
        ON DELETE CASCADE
);