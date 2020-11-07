import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface Person {
  person_id?: number,
  name?: string,
  email?: string,
  phone_number?: string,
  in_app_notification?: boolean,
  // Made these into strings to make form inputs easier
  student_id?: string,
  faculty_id?: string,
  job_title?: string
}

const initialState: Person = {
  in_app_notification: true
};

export const personSlice = createSlice({
  name: 'person',
  initialState: initialState,
  reducers: {
    setPerson: (state: Draft<Person>, action: PayloadAction<Person>) => {
      state.person_id = action.payload.person_id;
      state.name = action.payload.name;
      state.job_title = action.payload.job_title;
      state.faculty_id = action.payload.faculty_id;
      state.student_id = action.payload.student_id;
      state.in_app_notification = action.payload.in_app_notification;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
    }
  }
});

export const { setPerson } = personSlice.actions;

export const selectPersonState = (state: RootState) => state.person

export default personSlice.reducer;
