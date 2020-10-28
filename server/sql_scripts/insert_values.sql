/**
  The order these queries run is very particular because of all of the foreign key constraints and also because of the ids.
 */

INSERT INTO scheduled_class(start_day, end_day, class_name)
    VALUES ('2020-09-08'::TIMESTAMP, '2020-12-03'::TIMESTAMP, 'CPSC 304 101');

INSERT INTO scheduled_class(start_day, end_day, class_name)
    VALUES ('2020-09-08'::TIMESTAMP, '2020-12-03'::TIMESTAMP, 'CPSC 313 101');

INSERT INTO scheduled_class(start_day, end_day, class_name)
    VALUES ('2020-09-08'::TIMESTAMP, '2020-12-03'::TIMESTAMP, 'MATH 100 101');

INSERT INTO scheduled_class(start_day, end_day, class_name)
    VALUES ('2020-09-08'::TIMESTAMP, '2020-12-03'::TIMESTAMP, 'CHEM 121 102');

INSERT INTO scheduled_class(start_day, end_day, class_name)
    VALUES ('2020-09-08'::TIMESTAMP, '2020-12-03'::TIMESTAMP, 'PHYS 100 103');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V6T1Z1', 'Vancouver', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V6T1Z2', 'Vancouver', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V6T1Z4', 'Vancouver', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V5L3X3', 'Vancouver', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V5S3R3', 'Vancouver', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V6H3N1', 'Vancouver', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V3S5M2', 'Surrey', 'BC');

INSERT INTO postal_address(postal_code, city, province)
    VALUES('V2T2Y8', 'Abbotsford', 'BC');

INSERT INTO ubc_building(building_code, name, building_number, street, postal_code)
    VALUES('ICCS', 'Institute For Computing', '2336', 'Main Mall', 'V6T1Z4');

INSERT INTO ubc_building(building_code, name, building_number, street, postal_code)
    VALUES('DMP', 'Hugh Dempster Pavilion', '6245',  'Agronomy Road', 'V6T1Z4');

INSERT INTO ubc_building(building_code, name, building_number, street, postal_code)
    VALUES('MATH', 'Mathematics', '1984', 'Mathematics Road', 'V6T1Z2');

INSERT INTO ubc_building(building_code, name, building_number, street, postal_code)
    VALUES('CHEM', 'Chemistry', '2036', 'Main Mall', 'V6T1Z1');

INSERT INTO ubc_building(building_code, name, building_number, street, postal_code)
    VALUES('ALRD', 'Allard School of Law', '1822', 'E Mall', 'V6T1Z1');

INSERT INTO room(room_number, building_code, room_type)
    VALUES('110', 'DMP', 'classroom');

INSERT INTO room(room_number, building_code, room_type)
    VALUES('301', 'DMP', 'classroom');

INSERT INTO room(room_number, building_code, room_type)
    VALUES('100', 'MATH', 'classroom');

INSERT INTO room(room_number, building_code, room_type)
    VALUES('X139', 'ICCS', 'meeting_room');

INSERT INTO room(room_number, building_code, room_type)
    VALUES('X841', 'ICCS', 'office');

INSERT INTO entrance(room_number, building_code)
    VALUES('110', 'DMP');

INSERT INTO entrance(room_number, building_code)
    VALUES('301', 'DMP');

INSERT INTO entrance(room_number, building_code)
    VALUES('100', 'MATH');

INSERT INTO entrance(room_number, building_code)
    VALUES('X139', 'ICCS');

INSERT INTO entrance(room_number, building_code)
    VALUES('X841', 'ICCS');

INSERT INTO bubble(title, description)
    VALUES('Project Group 44', 'Project Group for CPSC 304');

INSERT INTO bubble(title, description)
    VALUES('The Bois', 'Jake, Richard, and Chris');

INSERT INTO bubble(title, description)
    VALUES('UBC Men''s Basketball Team', 'UBC Men''s Basketball Team');

INSERT INTO bubble(title, description)
    VALUES('UBC Random Club', 'Random club for random things');

INSERT INTO bubble(title, description)
    VALUES('CS Lunch Hangout Group', 'The group of people who hang out at ICICS X120 during lunch time');

INSERT INTO faculty(faculty_id, job_title)
    VALUES('987654321123', 'Professor');

INSERT INTO faculty(faculty_id, job_title)
    VALUES('987654321124', 'Course Coordinator');

INSERT INTO faculty(faculty_id, job_title)
    VALUES('987654321125', 'Associate Professor');

INSERT INTO faculty(faculty_id, job_title)
    VALUES('987654321126', 'Assistant Professor');

INSERT INTO faculty(faculty_id, job_title)
    VALUES('987654321127', 'Lecturer');

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Jake Smith', 'fake_email_pls_dont_use@gmail.com', NULL, FALSE, '123456789', NULL);

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Albert Einstein', NULL, '6041234567', TRUE, NULL, '987654321123');

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Iron Man', NULL, '6041234568', TRUE, NULL, '987654321124');

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Chris Evans', 'fake_email_pls_dont_use2@gmail.com', '6041234578', FALSE, '1234151565', NULL);

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Richard Man', 'fake_email_pls_dont_use3@gmail.com', NULL, FALSE, '123456789', NULL);

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Jolly Associate', 'fake_email_pls_dont_use7@gmail.com', NULL, FALSE, NULL, '987654321125');

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Jolly Assistant', 'fake_email_pls_dont_use5@gmail.com', NULL, FALSE, NULL, '987654321126');

INSERT INTO person(name, email, phone_number, in_app_notification, student_id, faculty_id)
    VALUES('Jolly Lecturer', 'fake_email_pls_dont_use6@gmail.com', NULL, FALSE, NULL, '987654321127');

/*
 Jake in The Bois
 */
INSERT INTO bubble_person(person_id, bubble_id)
    VALUES(1,1);

/*
 Chris in The Bois
 */
INSERT INTO bubble_person(person_id, bubble_id)
    VALUES(4,1);

/*
 Richard in The Bois
 */
INSERT INTO bubble_person(person_id, bubble_id)
    VALUES(5,1);

/*
 Jake in UBC Men's Basketball Team
 */
INSERT INTO bubble_person(person_id, bubble_id)
    VALUES(1,3);

/*
 Chris in ubc random club
 */
INSERT INTO bubble_person(person_id, bubble_id)
    VALUES(4,4);

INSERT INTO shared_bike(shared_bike_id, is_rentable)
    VALUES('1ac456789', TRUE);

INSERT INTO shared_bike(shared_bike_id, is_rentable)
    VALUES('123466789', TRUE);

INSERT INTO shared_bike(shared_bike_id, is_rentable)
    VALUES('123476789', TRUE);

INSERT INTO shared_bike(shared_bike_id, is_rentable)
    VALUES('123486789', TRUE);

INSERT INTO shared_bike(shared_bike_id, is_rentable)
    VALUES('123496789', TRUE);

INSERT INTO covid_testing_centre(building_number, street_number, postal_code, name)
    VALUES('6110', 'Boundary Rd', 'V5S3R3', 'Burnaby Central Park Covid-19 Assessment Centre');

INSERT INTO covid_testing_centre(building_number, street_number, postal_code, name)
    VALUES('1145', 'Commercial Dr', 'V5L3X3', 'Reach Community Health Centre');

INSERT INTO covid_testing_centre(building_number, street_number, postal_code, name)
    VALUES('4550', 'Oak St', 'V6H3N1', 'BC Women''s Hospital');

INSERT INTO covid_testing_centre(building_number, street_number, postal_code, name)
    VALUES('14577', '66 Ave', 'V3S5M2', 'Surrey Whalley UPCC COVID-19 Assessment Centre');

INSERT INTO covid_testing_centre(building_number, street_number, postal_code, name)
    VALUES('2692', 'Clearbook Rd', 'V2T2Y8', 'Abbotsford Upcc Covid-19 Assessment Centre');

/*
 Jake tested negative
 */
INSERT INTO covid_test(test_time, person_id, covid_testing_centre_id, status)
    VALUES('2020-10-05'::TIMESTAMP, 1, 1, FALSE);

/*
 Einstein tested positive
 */
INSERT INTO covid_test(test_time, person_id, covid_testing_centre_id, status)
    VALUES('2020-10-05'::TIMESTAMP, 2, 1, TRUE);

/*
 Iron Man tested negative
 */
INSERT INTO covid_test(test_time, person_id, covid_testing_centre_id, status)
    VALUES('2020-10-05'::TIMESTAMP, 3, 1, FALSE);

/*
 Chris tested negative
 */
INSERT INTO covid_test(test_time, person_id, covid_testing_centre_id, status)
    VALUES('2020-10-05'::TIMESTAMP, 4, 2, FALSE);

/*
 Richard tested negative
 */
INSERT INTO covid_test(test_time, person_id, covid_testing_centre_id, status)
    VALUES('2020-10-05'::TIMESTAMP, 5, 3, FALSE);

/*
 CPSC 304 and locations
 */
INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(1, 'tuesday', '110', 'DMP');

INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(1, 'thursday', '110', 'DMP');

/*
 CPSC 313 and locations
 */
INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(2, 'monday', '110', 'DMP');

INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(2, 'wednesday', '100', 'MATH');

INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(2, 'friday', '301', 'DMP');

/*
 Math 100 and locations
 */
INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(3, 'monday', '301', 'DMP');

/*
 Chem 121 and locations
 */
INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(4, 'wednesday', '301', 'DMP');

/*
 Phys 100 and locations
 */
INSERT INTO class_day(scheduled_class_id, day_of_week, room_number, building_code)
    VALUES(5, 'friday', '100', 'MATH');

/*
 Einstein rode bike 1ac456789 on Oct 4
 */
INSERT INTO person_shared_bike(shared_bike_id, person_id, rental_time)
    VALUES('1ac456789', '2', '2020-10-04 00:00:00'::TIMESTAMP);

/*
 Jake rode bike 1ac456789 on Oct 5
 */
INSERT INTO person_shared_bike(shared_bike_id, person_id, rental_time)
    VALUES('1ac456789', '1', '2020-10-05 00:00:00'::TIMESTAMP);

/*
 Iron Man rode bike 1ac456789 on Oct 7
 */
INSERT INTO person_shared_bike(shared_bike_id, person_id, rental_time)
    VALUES('1ac456789', '3', '2020-10-07 00:00:00'::TIMESTAMP);

/*
 Chris rode bike 1ac456789 on Oct 8
 */
INSERT INTO person_shared_bike(shared_bike_id, person_id, rental_time)
    VALUES('1ac456789', '4', '2020-10-08 00:00:00'::TIMESTAMP);

/*
 Richard rode bike 1ac456789 on Oct 9
 */
INSERT INTO person_shared_bike(shared_bike_id, person_id, rental_time)
    VALUES('1ac456789', '5', '2020-10-09 00:00:00'::TIMESTAMP);

INSERT INTO notification(category, subject_line, body)
    VALUES('email', 'Covid Contact Notification', 'On Oct 9, 2020, you had an encounter at DMP 110 with someone who tested Covid-19');

INSERT INTO notification(category, subject_line, body)
    VALUES('text', NULL, 'On Oct 9, 2020, you had an encounter at DMP 110 with someone who tested Covid-19');

INSERT INTO notification(category, subject_line, body)
    VALUES('inApp', NULL, 'On Oct 9, 2020, you had an encounter at DMP 110 with someone who tested Covid-19');

INSERT INTO notification(category, subject_line, body)
    VALUES('email', 'Covid Contact Notification', 'On Oct 10, 2020, you had an encounter at DMP 110 with someone who tested Covid-19');

INSERT INTO notification(category, subject_line, body)
    VALUES('text', NULL, 'On Oct 10, 2020, you had an encounter at DMP 110 with someone who tested Covid-19');

INSERT INTO person_notification(notification_id, person_id, notification_time)
    VALUES(1, 1, '2020-10-11 00:00:00'::TIMESTAMP);

/*
 Einstein receives an email and an inApp notification
 */
INSERT INTO person_notification(notification_id, person_id, notification_time)
    VALUES(1, 2, '2020-10-11 00:00:00'::TIMESTAMP);

INSERT INTO person_notification(notification_id, person_id, notification_time)
    VALUES(3, 2, '2020-10-11 00:00:00'::TIMESTAMP);

INSERT INTO person_notification(notification_id, person_id, notification_time)
    VALUES(4, 4, '2020-10-11 00:00:00'::TIMESTAMP);

INSERT INTO person_notification(notification_id, person_id, notification_time)
    VALUES(5, 4, '2020-10-11 00:00:00'::TIMESTAMP);

/*
  All the people are in CPSC 304 101
 */
INSERT INTO scheduled_class_person(scheduled_class_id, person_id)
    VALUES(1, 1);

INSERT INTO scheduled_class_person(scheduled_class_id, person_id)
    VALUES(1, 2);

INSERT INTO scheduled_class_person(scheduled_class_id, person_id)
    VALUES(1, 3);

INSERT INTO scheduled_class_person(scheduled_class_id, person_id)
    VALUES(1, 4);

INSERT INTO scheduled_class_person(scheduled_class_id, person_id)
    VALUES(1, 5);

/*
  All the people entered DMP 110 on Oct 9
 */
INSERT INTO person_time_entrance(entrance_code, start_date, person_id)
    VALUES(1, '2020-10-09 00:00:00'::TIMESTAMP, 1);

INSERT INTO person_time_entrance(entrance_code, start_date, person_id)
    VALUES(1, '2020-10-09 00:00:00'::TIMESTAMP, 2);

INSERT INTO person_time_entrance(entrance_code, start_date, person_id)
    VALUES(1, '2020-10-09 00:00:00'::TIMESTAMP, 3);

INSERT INTO person_time_entrance(entrance_code, start_date, person_id)
    VALUES(1, '2020-10-09 00:00:00'::TIMESTAMP, 4);

INSERT INTO person_time_entrance(entrance_code, start_date, person_id)
    VALUES(1, '2020-10-09 00:00:00'::TIMESTAMP, 5);
