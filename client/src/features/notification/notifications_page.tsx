import React, {useEffect, useState} from "react";
import {notificationService} from "../../services/notification.service";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import {NotificationModel} from "../../model/notification";
import { groupBy } from "lodash";
import {Dictionary} from "@reduxjs/toolkit";

export default function NotificationsPage() {
  const [notifications, setNotifications]: [Dictionary<NotificationModel[]>, any] = useState({});
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const personState: Person = useSelector(selectPersonState);

  useEffect(() => {
    notificationService.getNotifications(personState.person_id as number)
      .then((notifications: NotificationModel[]) => {
        setIsLoading(false);
        const notificationsGroupedByMessage: Dictionary<NotificationModel[]> = groupBy(notifications, 'body');
        setNotifications(notifications);
      });
  }, []);

  if (isLoading) {
    return <div/>
  }

  if (Object.keys(notifications).length === 0) {

  }

  return (<div></div>)
}