import {createSlice, Draft} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../../app/store";
import {personService} from "../../services/person.service";
import {Person, setPerson, setPersonStatus} from '../person/person.slice';
import {wait} from "../../util";
import {notificationService} from "../../services/notification.service";
import {toast} from "react-toastify";

interface LoggedInState {
  isLoggedIn: boolean,
  isAppLoading: boolean
}

const initialState: LoggedInState = {
  isLoggedIn: false,
  isAppLoading: true
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    login: (state: Draft<LoggedInState>) => {
      state.isLoggedIn = true
    },
    appLoaded: (state: Draft<LoggedInState>) => {
      state.isAppLoading = false
    }
  }
});

export const fetchPerson = (personId: string): AppThunk => dispatch => {
  personService.getPersonById(personId).then((person: Person) => {
    dispatch(setPerson(person));
    dispatch(startStatusPoll(personId));
    dispatch(login());
    dispatch(appLoaded());
  });
};

export const startStatusPoll = (personId: number | string): AppThunk => async dispatch => {
  const pollingTimeout: number = 5000;

  while (true) {
    await wait(pollingTimeout);
    try {
      const [status, unreadNotifications] = await Promise.all([
        personService.getPersonStatusById(personId),
        notificationService.getUnreadNotifications(personId)]);
      dispatch(setPersonStatus(status));
      if (unreadNotifications.length > 0) {
        unreadNotifications.forEach(unreadNotification => {
          toast.error(unreadNotification.body, {
              onOpen: () => notificationService.markNotificationAsRead(personId, unreadNotification.notification_id),
              autoClose: false
            }
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const {login, appLoaded} = loginSlice.actions;
export const selectIsLoggedIn = (state: RootState): boolean => state.login.isLoggedIn;
export const selectIsAppLoading = (state: RootState): boolean => state.login.isAppLoading;

export default loginSlice.reducer;
