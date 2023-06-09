import { createSlice } from "@reduxjs/toolkit";
import { Story } from "../types";

type IStoryState = {
  isShowForm: boolean;
  isFormSubmitted: boolean;
};

const initialState: IStoryState = {
  isShowForm: true,
  isFormSubmitted: false,
};

const storyStateSlice = createSlice({
  name: "week4",
  initialState,
  reducers: {
    setShowForm: (state, action) => ({
      ...state,
      isShowForm: action.payload,
    }),
    setFormSubmitted: (state, action) => ({
      ...state,
      isFormSubmitted: action.payload,
    }),
  },
});

const { reducer, actions } = storyStateSlice;

export const { setShowForm, setFormSubmitted } = actions;

export default reducer;
