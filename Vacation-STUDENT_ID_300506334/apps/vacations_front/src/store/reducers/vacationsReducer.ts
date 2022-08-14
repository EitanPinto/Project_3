import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFollowersPerVacationResponseObj } from "../services/adminService";
import { IvacationObjResponse } from "../services/vacationsService";

export interface VacationsState {
    vacations: Array<IvacationObjResponse> | [];
    vacationStats: Array<IFollowersPerVacationResponseObj> | [];
};
export const initialState: VacationsState = {
  vacations: [],
  vacationStats: []
};

export const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    setVacations: (state: VacationsState, action: PayloadAction<Array<IvacationObjResponse> | []>): void => {
      state.vacations = action.payload;
    },
    setVacationsStats: (state: VacationsState, action: PayloadAction<Array<IFollowersPerVacationResponseObj> | []>): void => {
      state.vacationStats = action.payload;
    }
  }
});


export const { setVacations, setVacationsStats } = vacationsSlice.actions;
export default vacationsSlice.reducer;


