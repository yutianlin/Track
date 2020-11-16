import React, {useEffect, useState} from "react";
import {notificationService} from "../../services/notification.service";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import {NotificationModel} from "../../model/notification";
import { groupBy } from "lodash";
import {Dictionary} from "@reduxjs/toolkit";
import NotificationAccordion from "./notification_accordion";
import "./notifications_page.css";

export default function NotificationsPage() {
  const [notifications, setNotifications]: [Dictionary<NotificationModel[]>, any] = useState({});
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const personState: Person = useSelector(selectPersonState);

  useEffect(() => {
    notificationService.getNotifications(personState.person_id as number)
      .then((notifications: NotificationModel[]) => {
        setIsLoading(false);
        const notificationsGroupedByMessage: Dictionary<NotificationModel[]> = groupBy(notifications, 'body');
        setNotifications(notificationsGroupedByMessage);
      });
  }, []);

  if (isLoading) {
    return <div/>
  }

  if (Object.keys(notifications).length === 0) {
    return (
      <div className = "notifications_page">
        <h1>You have no notifications</h1>
      </div>
    )
  }

  const sortedNotificationKeys = Object.keys(notifications).sort((keyA: any, keyB: any) => {
    const notificationsA = notifications[keyA] as NotificationModel[];
    const notificationsB = notifications[keyB] as NotificationModel[];
    return notificationsA[0].notification_time.isAfter(notificationsB[0].notification_time) ? -1 : 1;
  })

  const notificationElements = sortedNotificationKeys.map((key: any, index) => {
    return <NotificationAccordion key = {index} notificationModels={notifications[key] as NotificationModel[]}/>
  })

  return (
    <div className = "notifications_page">
      <h2>Notifications</h2>
      {notificationElements}
    </div>
  )
}