import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {CovidTestInfo} from "../../model/covid_test";
import {RootState} from "../../app/store";

interface CovidTestState {
  covid_test?: CovidTestInfo
}

const initialState: CovidTestState = {
  covid_test: undefined
}

export const covidTest = createSlice({
  name: 'covidTest',
  initialState: initialState,
  reducers: {
    setCovidTestToEdit: (state: Draft<any>, action: PayloadAction<CovidTestInfo>) => {
      state.covid_test = action.payload;
    }
  }
});

export const { setCovidTestToEdit } = covidTest.actions;

export const selectCovidTestToEdit = (state: RootState) => state.covidTest.covid_test

export default covidTest.reducer;