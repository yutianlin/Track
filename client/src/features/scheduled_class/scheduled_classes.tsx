import React, {useEffect, useState} from "react";
import {Dictionary} from "@reduxjs/toolkit";
import {ClassDay} from "../../model/class_day";
import {scheduledClassService} from "../../services/scheduled_class.service";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import {groupBy, flatten} from 'lodash';
import {Container, Typography} from "@material-ui/core";
import ScheduledClassAccordion from "./scheduled_class_accordion";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import DebouncedInput from "../common/debounced_input";
import "./scheduled_class.css";

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

  const onSearch = async (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length > 0) {
      setIsSearchLoading(true);
      const newSearchedClasses = await scheduledClassService.getScheduledClassesByQueryString(newSearchTerm);
      setIsSearchLoading(false);
      setSearchedClassesWithoutEnrolled(newSearchedClasses, enrolledClasses);
    } else {
      setSearchedClasses({});
    }
  }

  const onActionButtonClick = async (endpointFn: (a: number, b: string) => Promise<any>,
                                     scheduled_class_id: string): Promise<void> => {
    await endpointFn(personState.person_id as number, scheduled_class_id);
    const newEnrolledClasses = await refreshEnrolledClasses();
    setSearchedClassesWithoutEnrolled(flatten(Object.values(searchedClasses)) as ClassDay[], newEnrolledClasses);
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

  let enrolledClassElement: any;
  if (Object.keys(enrolledClasses).length === 0) {
    enrolledClassElement = <Typography>You are currently not enrolled in any classes</Typography>
  } else {
    const allEnrolledClasses = Object.keys(enrolledClasses).map((key, index) => {
      return <ScheduledClassAccordion
        key = {index}
        classDays={enrolledClasses[key] as ClassDay[]}
        onActionClick={onDelete}
        actionButtonLabel="Delete"
        icon={faMinus}/>
    });
    enrolledClassElement = (
      <div className = "enrolled-class-container">
        <h3>Enrolled Classes</h3>
        {allEnrolledClasses}
      </div>
    )
  }

  let searchResultElement: any;
  if (Object.keys(searchedClasses).length === 0) {
    if (searchTerm !== "" && !isSearchLoading) {
      searchResultElement = <Typography>No classes were found by the search term.</Typography>
    }
  } else {
    searchResultElement = Object.keys(searchedClasses).map((key, index) => {
      return <ScheduledClassAccordion
        key={index}
        classDays={searchedClasses[key] as ClassDay[]}
        onActionClick={onAdd}
        actionButtonLabel="Add"
        icon={faPlus}/>
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
          placeholder="Search for classes"
          onDebounce={onSearch}
        />
        {searchResultElement}
      </div>
    </div>
  )
}