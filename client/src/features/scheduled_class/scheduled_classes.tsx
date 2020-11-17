import React, {useEffect, useState} from "react";
import {Dictionary} from "@reduxjs/toolkit";
import {ClassDay} from "../../model/class_day";
import {scheduledClassService} from "../../services/scheduled_class.service";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import {groupBy, flatten} from 'lodash';
import {Typography} from "@material-ui/core";
import ActionAccordion from "../common/action_accordion";
import DebouncedInput from "../common/debounced_input";
import "./scheduled_class.css";
import ScheduledClassAccordionContent from "./scheduled_class_accordion_content";

export default function ScheduledClasses() {
  const [enrolledClasses, setEnrolledClasses]: [Dictionary<ClassDay[]>, any] = useState({});
  const [searchedClasses, setSearchedClasses]: [Dictionary<ClassDay[]>, any] = useState({});
  const [searchTerm, setSearchTerm]: [string, any] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const personState: Person = useSelector(selectPersonState);

  const refreshEnrolledClasses = async (): Promise<Dictionary<ClassDay[]>> => {
    return scheduledClassService.getScheduledClassesByPersonId(personState.person_id as number)
      .then((classDays: ClassDay[]) => {
        const newEnrolledClasses = groupBy(classDays, "scheduled_class_id");
        setEnrolledClasses(newEnrolledClasses);
        return newEnrolledClasses;
      });
  }

  useEffect(() => {
    refreshEnrolledClasses().then(() => {
      setIsLoading(false);
    });
  }, []);

  const setSearchedClassesWithoutEnrolled = (searchResults: ClassDay[], whitelistedClasses: Dictionary<ClassDay[]>) => {
    const searchedClassesWithoutEnrolled = searchResults.filter(searchedClass => {
      return !whitelistedClasses.hasOwnProperty(searchedClass.scheduled_class_id);
    });
    setSearchedClasses(groupBy(searchedClassesWithoutEnrolled, "scheduled_class_id"));
  }

  const onSearch = async (newSearchTerm: string, whitelistedClasses = enrolledClasses) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length > 0) {
      setIsSearchLoading(true);
      const newSearchedClasses = await scheduledClassService.getScheduledClassesByQueryString(newSearchTerm);
      setIsSearchLoading(false);
      setSearchedClassesWithoutEnrolled(newSearchedClasses, whitelistedClasses);
    } else {
      setSearchedClasses({});
    }
  }

  const onActionButtonClick = async (endpointFn: (a: number, b: string) => Promise<any>,
                                     scheduled_class_id: string): Promise<void> => {
    await endpointFn(personState.person_id as number, scheduled_class_id);
    const newEnrolledClasses = await refreshEnrolledClasses();
    await onSearch(searchTerm, newEnrolledClasses);
  }

  const onAdd = async (scheduled_class_id: string) => {
    await onActionButtonClick(
      scheduledClassService.createPersonScheduledClass.bind(scheduledClassService),
      scheduled_class_id);
  }

  const onDelete = async (scheduled_class_id: string) => {
    await onActionButtonClick(
      scheduledClassService.deletePersonScheduledClass.bind(scheduledClassService),
      scheduled_class_id);
  }

  if (isLoading) {
    return <div/>
  }

  const createClassAccordion = (
    classDayDict: Dictionary<ClassDay[]>,
    key: string,
    index: number,
    actionButtonLabel: string,
    onActionClick: any): any => {
    const classDays: ClassDay[] = classDayDict[key] as ClassDay[];
    return <ActionAccordion
      key = {index}
      heading={classDays[0].scheduled_class_id}
      id={classDays[0].scheduled_class_id}
      secondaryHeading={classDays[0].activity}
      onActionClick={onActionClick}
      actionButtonLabel={actionButtonLabel}>
      <ScheduledClassAccordionContent classDays={classDays}/>
    </ActionAccordion>
  }


  let enrolledClassElement: any;
  if (Object.keys(enrolledClasses).length === 0) {
    enrolledClassElement = <Typography>You are currently not enrolled in any classes</Typography>
  } else {
    enrolledClassElement = Object.keys(enrolledClasses).map((key, index) => {
      return createClassAccordion(enrolledClasses, key, index, "Remove", onDelete);
    });
  }

  enrolledClassElement = (
    <div className = "enrolled-class-container">
      <h3>Enrolled Classes</h3>
      {enrolledClassElement}
    </div>
  )

  let searchResultElement: any;
  if (Object.keys(searchedClasses).length === 0) {
    if (searchTerm !== "" && !isSearchLoading) {
      searchResultElement = <Typography>No classes were found by the search term.</Typography>
    }
  } else {
    searchResultElement = Object.keys(searchedClasses).map((key, index) => {
      return createClassAccordion(searchedClasses, key, index, "Add", onAdd);
    });
  }

  return (
    <div className="scheduled-class-container">
      {enrolledClassElement}
      <div className="search-class-container">
        <h3>Enroll in Classes</h3>
        <DebouncedInput
          fullWidth={true}
          label="Search"
          placeholder="Search for classes by course id"
          onDebounce={onSearch}
        />
        {searchResultElement}
      </div>
    </div>
  )
}