import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../../app/store";
import {CovidTestingCentre} from "../../model/covid_testing_centre";
import {covidTestService} from "../../services/covid_test.service";

interface CovidTestingCentreState {
  allCovidTestingCentres: CovidTestingCentre[]
}

const initialState: CovidTestingCentreState = {
  allCovidTestingCentres: []
};

export const covidTestsSlice = createSlice({
  name: 'covidTestingCentre',
  initialState: initialState,
  reducers: {
    setCovidTestingCentres: (state: Draft<any>, action: PayloadAction<CovidTestingCentre[]>) => {
      state.allCovidTestingCentres = action.payload;
    }
  }
});

export const selectAllCovidTestingCentres = (state: RootState) => state.covidTestingCentre.allCovidTestingCentres;

export const fetchCovidTestingCentres = (): AppThunk => dispatch => {
  covidTestService.getAllCovidTestingCentres().then((covidTestingCentres: CovidTestingCentre[]) => {
    dispatch(covidTestsSlice.actions.setCovidTestingCentres(covidTestingCentres));
  });
};

export default covidTestsSlice.reducer;