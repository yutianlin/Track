import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {bikeService} from "../../services/bike.service";
import {AppThunk, RootState} from "../../app/store";

const initialState = {
  allBikes: []
};

export const bikeSlice = createSlice({
  name: 'bike',
  initialState: initialState,
  reducers: {
    setBikes: (state: Draft<any>, action: PayloadAction<string[]>) => {
      state.allBikes = action.payload;
    }
  }
});

export const selectAllBikes = (state: RootState) => state.bike.allBikes;

export const fetchBikes = (): AppThunk => dispatch => {
  bikeService.getAllBikes().then((bikes: any[]) => {
    dispatch(bikeSlice.actions.setBikes(bikes.map(bike => bike.shared_bike_id)));
  });
};


export default bikeSlice.reducer;