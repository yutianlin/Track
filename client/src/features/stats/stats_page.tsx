import React, {useEffect, useState} from "react";
import {isStringEmpty, pluralize} from "../../util";
import {statsService} from "../../services/stats.service";

export default function StatsPage() {
  const [frequentlyUsedBuildingStr, setFrequentlyUsedBuildingStr] = useState("");
  const [largestScheduledClassStr, setLargestScheduledClassStr] = useState("");

  const formatFrequentlyUsedBuilding = (frequentlyUsedBuilding: any): string => {
    const numTimesString = pluralize(frequentlyUsedBuilding.count, "time");
    return `${frequentlyUsedBuilding.building_code} (${frequentlyUsedBuilding.count} ${numTimesString})`;
  }

  const formatScheduledClass = (scheduledClass: any): string => {
    const numPersonsString = scheduledClass.count === 1 ? "person" : "people";
    return `${scheduledClass.scheduled_class_id} (${scheduledClass.count} ${numPersonsString})`;
  }

  const formatAndSet = (
    elements: any[],
    setFunction: any,
    formatFn: (element: any) => string,
    singleElementString: string,
    multiElementString: string): void => {
    if (elements.length > 0) {
      if (elements.length === 1) {
        setFunction(`${formatFn(elements[0])} ${singleElementString}`)
      } else {
        const elementStrs = elements.map((element) => {
          return formatFn(element);
        });
        const lastEl = elementStrs.pop();
        setFunction(`${elementStrs.join(", ")} and ${lastEl} ${multiElementString}`)
      }
    }
  }

  const formatAndSetLargestScheduledClasses = (largestScheduledClasses: any) => {
    formatAndSet(
      largestScheduledClasses,
      setLargestScheduledClassStr,
      formatScheduledClass,
      "has the most enrolled users.",
      "have the enrolled users."
    );
  }

  const formatAndSetFrequentlyUsedBuildings = (mostFrequentlyVisitedBuildings: any[]): void => {
    formatAndSet(
      mostFrequentlyVisitedBuildings,
      setFrequentlyUsedBuildingStr,
      formatFrequentlyUsedBuilding,
      "is the most frequently visited building.",
      "are the most frequently visited buildings."
    );
  }

  useEffect(() => {
    Promise.all([
      statsService.getMostFrequentlyVisitedBuildings(),
      statsService.getLargestScheduledClasses()]).then(([mostFrequentlyVisitedBuildings, largestScheduledClasses]: [any[], any[]]) => {
      formatAndSetFrequentlyUsedBuildings(mostFrequentlyVisitedBuildings);
      formatAndSetLargestScheduledClasses(largestScheduledClasses);
    });
  }, [])

  if (isStringEmpty(frequentlyUsedBuildingStr) && isStringEmpty(largestScheduledClassStr)) {
    return <div/>
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15vh'}}>
      <h1 style={{marginBottom: '20px'}}>Stats</h1>
      <h5 style={{margin: '20px', textAlign: 'left'}}>{frequentlyUsedBuildingStr}</h5>
      <h5 style={{margin: '20px', textAlign: 'left'}}>{largestScheduledClassStr}</h5>
    </div>)
}