import { createSlice } from "@reduxjs/toolkit";

type IStoryState = {
  currentIndex: number;
  storyLength: number;
  pause: boolean;
  currentBlurColor: string;
};

const initialState: IStoryState = {
  currentIndex: 0,
  storyLength: 0,
  pause: true,
  currentBlurColor: "transparent",
};

const storyStateSlice = createSlice({
  name: "story-state",
  initialState,
  reducers: {
    nextSlide: (state) => {
      const currentIndex = state.currentIndex + 1;

      return {
        ...state,
        currentIndex: currentIndex > state.storyLength - 1 ? 0 : currentIndex,
      };
    },
    prevSlide: (state) => {
      const currentIndex = state.currentIndex - 1;

      return {
        ...state,
        currentIndex: currentIndex < 0 ? state.storyLength - 1 : currentIndex,
      };
    },
    setStoryLength: (state, action) => {
      return {
        ...state,
        storyLength: action.payload,
      };
    },
    setCurrentIndex: (state, action) => {
      return {
        ...state,
        currentIndex: action.payload,
      };
    },
    togglePause: (state) => {
      return {
        ...state,
        pause: !state.pause,
      };
    },
    setPause: (state, action) => {
      return {
        ...state,
        pause: action.payload,
      };
    },
    setCurrentBlur: (state, action) => {
      return {
        ...state,
        currentBlurColor: action.payload,
      };
    },
  },
});

const { reducer, actions } = storyStateSlice;

export const {
  nextSlide,
  prevSlide,
  setStoryLength,
  setCurrentIndex,
  togglePause,
  setPause,
  setCurrentBlur,
} = actions;

export default reducer;
