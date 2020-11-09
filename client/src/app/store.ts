import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from "../features/login/login.slice";
import personReducer from "../features/person/person.slice";
import bikeReducer from "../features/bike/bike.slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    person: personReducer,
    bike: bikeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
