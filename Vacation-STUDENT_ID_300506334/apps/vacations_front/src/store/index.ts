import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducer";
import modalReducer from "./reducers/modalReducer";
import vacationsReducer from "./reducers/vacationsReducer";


export const store = configureStore({
  reducer: {
    authorization: authReducers,
    vacations: vacationsReducer,
    popUpModal: modalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
