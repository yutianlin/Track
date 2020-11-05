import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface PersonState {
    id?: number,
    name?: string,
    email?: string,
    phoneNumber?: string,
    inAppNotification?: boolean,
    studentId?: number,
    facultyId?: number,
    jobTitle?: string
}

const initialState: PersonState = {
    inAppNotification: true
};

export const personSlice = createSlice({
    name: 'person',
    initialState: initialState,
    reducers: {
        setPerson: (state: Draft<PersonState>, action: PayloadAction<PersonState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.jobTitle = action.payload.jobTitle;
            state.facultyId = action.payload.facultyId;
            state.studentId = action.payload.studentId;
            state.inAppNotification = action.payload.inAppNotification;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
        },
        setId: (state: Draft<PersonState>, action: PayloadAction<number>) => {
            state.id = action.payload
        },
        setName: (state: Draft<PersonState>, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setEmail: (state: Draft<PersonState>, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPhoneNumber: (state: Draft<PersonState>, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        setStudentId: (state: Draft<PersonState>, action: PayloadAction<number>) => {
            state.studentId = action.payload
        },
        setFacultyId: (state: Draft<PersonState>, action: PayloadAction<number>) => {
            state.facultyId = action.payload
        },
        setJobTitle: (state: Draft<PersonState>, action: PayloadAction<string>) => {
            state.jobTitle = action.payload
        }
    }
});

export const { setPerson } = personSlice.actions;

export const selectPersonState = (state: RootState) => state.person

export default personSlice.reducer;
