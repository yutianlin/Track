/*
 To run these queries:
 psql -d <database_name> -f <this_file_path>
 */

CREATE TABLE scheduled_class (
	scheduled_class_id serial PRIMARY KEY,
	start_day timestamptz NOT NULL,
	end_day timestamptz NOT NULL,
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
	postal_code char(6) NOT NULL,
	building_number varchar(100) NOT NULL,
	street varchar(100) NOT NULL,
	FOREIGN KEY (postal_code) REFERENCES postal_address(postal_code)
);

CREATE TABLE room(
	room_number varchar(10),
	building_code varchar(10),
	room_type varchar(100)
	    CHECK(room_type = 'classroom' OR room_type = 'meeting_room' OR room_type='office')
	    NOT NULL,
	PRIMARY KEY (room_number, building_code),
	FOREIGN KEY (building_code) REFERENCES ubc_building(building_code)
		ON DELETE CASCADE
);


CREATE TABLE class_day(
	scheduled_class_id int,
	class_day_id serial,
	day_of_week varchar(10)
	    CHECK(day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'))
	    NOT NULL,
	room_number varchar(10),
	building_code varchar(10),
	PRIMARY KEY(scheduled_class_id, class_day_id),
	FOREIGN KEY(scheduled_class_id) REFERENCES scheduled_class
	    ON DELETE CASCADE,
    FOREIGN KEY (room_number, building_code) REFERENCES room(room_number, building_code)
);

CREATE TABLE entrance(
	entrance_id serial PRIMARY KEY,
	room_number varchar(10),
	building_code varchar(10) NOT NULL,
	FOREIGN KEY (room_number, building_code) REFERENCES room(room_number, building_code),
	FOREIGN KEY (building_code) REFERENCES ubc_building(building_code)
);

CREATE TABLE bubble(
	bubble_id serial PRIMARY KEY,
	title varchar(100) NOT NULL,
	description varchar(100) NOT NULL
);

CREATE TABLE faculty(
	faculty_id bigint PRIMARY KEY,
    job_title varChar(100) NOT NULL
);

CREATE TABLE person(
    person_id serial PRIMARY KEY,
    name varchar (250) NOT NULL,
    email varchar (250),
    phone_number varchar(20),
    in_app_notification boolean
        DEFAULT FALSE
        NOT NULL,
    student_id bigint,
    faculty_id bigint,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
	    ON DELETE SET NULL,
	CONSTRAINT has_notification_setting
	    CHECK(in_app_notification = TRUE OR phone_number is not NULL OR email is not NULL)
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
	shared_bike_id varchar(100) PRIMARY KEY,
	is_rentable boolean NOT NULL
);

CREATE TABLE covid_testing_centre(
	covid_testing_centre_id serial PRIMARY KEY,
	building_number varchar(250) NOT NULL,
	street_number varchar(250) NOT NULL,
	postal_code char(6) NOT NULL,
	name varchar(250) NOT NULL,
	FOREIGN KEY (postal_code) REFERENCES postal_address(postal_code)
	    ON DELETE SET NULL
);

CREATE TABLE covid_test(
	test_time timestamptz,
	person_id integer,
	covid_testing_centre_id integer,
	status boolean,
	PRIMARY KEY (test_time, person_id, covid_testing_centre_id),
	FOREIGN KEY (person_id) REFERENCES Person,
	FOREIGN KEY (covid_testing_centre_id) REFERENCES covid_testing_centre(covid_testing_centre_id)
	    ON DELETE CASCADE
);

CREATE TABLE person_time_entrance(
	person_id integer,
	start_time timestamptz,
	entrance_id int,
	PRIMARY KEY (person_id, start_time, entrance_id),
	FOREIGN KEY (person_id) REFERENCES person(person_id)
	    ON DELETE CASCADE,
	FOREIGN KEY (entrance_id) REFERENCES entrance(entrance_id)
	    ON DELETE CASCADE
);

CREATE TABLE person_shared_bike(
	shared_bike_id varchar(100),
	person_id integer,
	rental_time timestamptz NOT NULL,
	PRIMARY KEY(shared_bike_id, person_id, rental_time),
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
	category varchar(5)
	    CHECK(category = 'email' OR category ='inApp' or category = 'text')
	    NOT NULL,
	subject_line varchar(100),
	body varchar(100) NOT NULL,
	CONSTRAINT subject_line_constraint
	    CHECK(category = 'email' AND subject_line IS NOT NULL OR
	         (category = 'inApp' or category = 'text') AND subject_line IS NULL)
);

CREATE TABLE person_notification(
	notification_id integer,
	person_id integer,
	notification_time timestamptz NOT NULL,
	PRIMARY KEY(notification_id, person_id),
	FOREIGN KEY (notification_id) REFERENCES notification(notification_id)
	    ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(person_id)
        ON DELETE CASCADE
);
