import React, {useState} from "react";
import {EntranceInfo} from "../../model/entrance_info";
import {entranceService} from "../../services/entrance.service";
import DebouncedInput from "../common/debounced_input";
import {Button, Container, Typography} from "@material-ui/core";
import {formatAddress, isStringEmpty} from "../../util";
import {useSelector} from "react-redux";
import {selectPersonState} from "../person/person.slice";
import { toast } from 'react-toastify';
import {formStyles} from "../form.styles";
import './entrance_input.css';

export default function EntranceInput() {
  const person = useSelector(selectPersonState);
  const [entrance, setEntrance]: [EntranceInfo | undefined, any] = useState(undefined);
  const [showCheckIn, setShowCheckIn]: [boolean, any] = useState(false);
  const [error, setError] = useState("");
  const formClasses = formStyles();

  const onChange = async (searchTerm: string) => {
    if (searchTerm === "") {
      setError("");
      setEntrance(undefined);
    } else {
      if (!Number.isNaN(Number.parseInt(searchTerm))) {
        const entrance: EntranceInfo | undefined = await entranceService.getEntranceInfoById(searchTerm);
        setEntrance(entrance);
        setShowCheckIn(true);
        if (entrance === undefined) {
          setShowCheckIn(false);
          setError("The entrance id did not exist, please try again.");
        }
      } else {
        setShowCheckIn(false);
        setError("The entrance id did not exist, please try again.");
      }
    }
  }

  const onCheckIn = async () => {
    if (entrance !== undefined) {
      const entranceDefined = entrance as EntranceInfo;
      try {
        await entranceService.createPersonEntrance(person.person_id as number, entranceDefined.entrance_id);
        toast.success("Checked in successfully!");
        setError("");
        setShowCheckIn(false);
      } catch (e) {
        toast.error("There was an error while checking in, please try again");
      }
    }
  }

  let entranceInfo: any;
  if (entrance === undefined) {
    if (!isStringEmpty(error)) {
      entranceInfo = <Typography>{error}</Typography>
    }
  } else {
    const entranceDefined = entrance as EntranceInfo;
    entranceInfo = (
     <div className="entrance-info-container-with-button">
       <div className="entrance-info-container">
         <Typography color = "textSecondary">
           Building Name: {entranceDefined.name}
         </Typography>
         <Typography color = "textSecondary">
           Address: {formatAddress(entranceDefined)}
         </Typography>
         <Typography color = "textSecondary">
           Room: {`${entranceDefined.building_code} ${entranceDefined.room_number}`}
         </Typography>
       </div>
       {showCheckIn && <Button
         fullWidth
         onClick={onCheckIn}
         size = "large"
         variant="outlined">Check-In</Button>}
     </div>
    )
  }

  return (
    <Container className="entrance-input-container">
      <DebouncedInput
        placeholder="Entrance Number"
        onDebounce={onChange}
      />
      {entranceInfo}
    </Container>
    )
}