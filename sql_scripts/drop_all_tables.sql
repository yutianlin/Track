/*
 To run these queries:
 psql -d <database_name> -f <this_file_path>

 Drops tables in order of foreign key constraints to clear all data
 */


DROP TABLE person_time_entrance;
DROP TABLE person_shared_bike;
DROP TABLE scheduled_class_person;
DROP TABLE covid_test;
DROP TABLE person_notification;
DROP TABLE covid_testing_centre;
DROP TABLE shared_bike;
DROP TABLE bubble_person;
DROP TABLE bubble;
DROP TABLE notification;
DROP TABLE class_day;
DROP TABLE entrance;
DROP TABLE scheduled_class;
DROP TABLE room;
DROP TABLE person;
DROP TABLE ubc_building;
DROP TABLE postal_address;