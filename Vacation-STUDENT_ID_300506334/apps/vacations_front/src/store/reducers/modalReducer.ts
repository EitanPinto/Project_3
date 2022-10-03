import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  modalActionToggle: boolean;
  headerText?: string;
  bodyText?: string;
};
export const initialState: ModalState = {
  modalActionToggle: false,
  headerText: "Something Went Wrong ...",
  bodyText: ""
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setPopUpModalAction: (state: ModalState, action: PayloadAction<ModalState>): void => {
      const { modalActionToggle, headerText, bodyText } = action.payload;
      state.modalActionToggle = modalActionToggle;
      state.headerText = headerText;
      state.bodyText = bodyText;
    }
  }
});


export const { setPopUpModalAction } = modalSlice.actions;
export default modalSlice.reducer;


