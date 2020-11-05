import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from "../features/login/login.slice"
import personReducer from "../features/person/person.slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    person: personReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
