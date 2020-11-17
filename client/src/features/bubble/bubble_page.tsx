import React, {useEffect, useState} from "react";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import ActionAccordion from "../common/action_accordion";
import {Button, Typography} from "@material-ui/core";
import DebouncedInput from "../common/debounced_input";
import {BubbleInfo} from "../../model/bubble_info";
import {bubbleService} from "../../services/bubble.service";
import BubbleAccordionContent from "./bubble_accordion_content";
import {useHistory} from "react-router";
import {createBubbleRoute} from "../routes";

export default function BubblePage() {
  const [usersBubbles, setUsersBubbles]: [BubbleInfo[], any] = useState([]);
  const [searchedBubbles, setSearchedBubbles]: [BubbleInfo[], any] = useState([]);
  const [searchTerm, setSearchTerm]: [string, any] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const personState: Person = useSelector(selectPersonState);
  const history = useHistory();

  const refreshBubbles = async (): Promise<BubbleInfo[]> => {
    return bubbleService.getBubbleInfosByPersonId(personState.person_id as number)
      .then((bubbles: BubbleInfo[]) => {
        setUsersBubbles(bubbles);
        return bubbles;
      });
  }

  useEffect(() => {
    refreshBubbles().then(() => {
      setIsLoading(false);
    });
  }, []);

  const setSearchedBubblesWithoutWhitelist = (searchResults: BubbleInfo[], whitelistedBubbles: BubbleInfo[]) => {
    const searchedClassesExcludingWhitelist = searchResults.filter(searchedBubble => {
      return !whitelistedBubbles.some(bubble => bubble.bubble_id === searchedBubble.bubble_id);
    });
    setSearchedBubbles(searchedClassesExcludingWhitelist);
  }

  const onSearch = async (newSearchTerm: string, whitelistedBubbles: BubbleInfo[] = usersBubbles) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length > 0) {
      setIsSearchLoading(true);
      const newSearchedClasses = await bubbleService.getBubbleInfosBySearchTerm(newSearchTerm);
      setIsSearchLoading(false);
      setSearchedBubblesWithoutWhitelist(newSearchedClasses, whitelistedBubbles);
    } else {
      setSearchedBubbles([]);
    }
  }

  const onActionButtonClick = async (endpointFn: (a: number, b: string) => Promise<any>,
                                     bubble_id: string): Promise<void> => {
    await endpointFn(personState.person_id as number, bubble_id);
    const newBubbles = await refreshBubbles();
    await onSearch(searchTerm, newBubbles);
  }

  const onAdd = async (bubble_id: string) => {
    await onActionButtonClick(
      bubbleService.createPersonBubble.bind(bubbleService),
      bubble_id);
  }

  const onDelete = async (bubble_id: string) => {
    await onActionButtonClick(
      bubbleService.deletePersonBubble.bind(bubbleService),
      bubble_id);
  }

  if (isLoading) {
    return <div/>
  }

  const createClassAccordion = (
    bubble: BubbleInfo,
    actionButtonLabel: string,
    onActionClick: any): any => {
    return (<ActionAccordion
      key = {bubble.bubble_id}
      heading={bubble.title}
      id={bubble.bubble_id}
      onActionClick={onActionClick}
      actionButtonLabel={actionButtonLabel}>
      <BubbleAccordionContent bubble={bubble}/>
    </ActionAccordion>);
  }


  let userBubbleElement: any;
  if (usersBubbles.length === 0) {
    userBubbleElement = <Typography>You are not in any bubbles.</Typography>
  } else {
    userBubbleElement = usersBubbles.map(bubble => {
      return createClassAccordion(bubble, "Remove", onDelete);
    });
  }

  userBubbleElement = (
    <div className = "enrolled-class-container">
      <h3>Your Bubbles</h3>
      <Button
        variant = "outlined"
        style={{marginBottom: '2vh'}}
        onClick={() => history.push(createBubbleRoute)}>
        Create a bubble
      </Button>
      {userBubbleElement}
    </div>
  )

  let searchResultElement: any;
  if (searchedBubbles.length === 0) {
    if (searchTerm !== "" && !isSearchLoading) {
      searchResultElement = <Typography>No bubbles were found by the search term.</Typography>
    }
  } else {
    searchResultElement = searchedBubbles.map(bubble => {
      return createClassAccordion(bubble, "Add", onAdd);
    });
  }

  return (
    <div className="scheduled-class-container">
      {userBubbleElement}
      <div className="search-class-container">
        <h3>Join Bubbles</h3>
        <DebouncedInput
          style={{marginBottom: '2vh'}}
          fullWidth={true}
          label="Search"
          placeholder="Search for bubbles"
          onDebounce={onSearch}
        />
        {searchResultElement}
      </div>
    </div>
  )
}