import {createSlice, Draft} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../../app/store";
import {PersonService} from "../../services/person.service";
import {PersonState, setPerson} from '../person/person.slice';

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
    PersonService.getPersonById(personId).then((person: PersonState) => {
        dispatch(setPerson(person));
        dispatch(login());
        dispatch(appLoaded())
    });
};

export const {login, appLoaded} = loginSlice.actions;
export const selectIsLoggedIn = (state: RootState): boolean => state.login.isLoggedIn;

export default loginSlice.reducer;