import React from "react";
import {PersonBike} from "../../model/person.bike";
import {Typography} from "@material-ui/core";
import "./bike.log.css";
import {formatMoment} from "../../util";

export default function BikeLog(props: { [bikeHistories: string]: PersonBike[] }) {
  if (!props.bikeHistories) {
    return (
      <div/>
    )
  } else {
    const bikeHistoryElements = props.bikeHistories.map((bikeHistory: PersonBike) => {
      const isoString: string = bikeHistory.rental_time.toISOString();
      const date: string = formatMoment(bikeHistory.rental_time);
      const text = `${date}: Bike ${bikeHistory.shared_bike_id}`;
      return (
        <Typography key={isoString}>
          {text}
        </Typography>)
    });

    return (
      <div className = "bike-log-container">
        <Typography variant = "h5">Rental Log</Typography>
        <div className = "bike-log-text-container">
          {bikeHistoryElements}
        </div>
      </div>
    )
  }
}