import { createSlice } from "@reduxjs/toolkit";

type IStoryState = {
  currentIndex: number;
  storyLength: number;
  pause: boolean;
  currentBlurColor: string;
  muted: boolean;
  loop: boolean;
  loading: boolean;
  activeVideoRef: any;
};

const initialState: IStoryState = {
  currentIndex: 0,
  storyLength: 0,
  pause: true,
  currentBlurColor: "transparent",
  muted: false,
  loop: false,
  loading: true,
  activeVideoRef: null,
};

const storyStateSlice = createSlice({
  name: "story-state",
  initialState,
  reducers: {
    nextSlide: (state) => {
      let nextIndex = state.currentIndex + 1;
      let pause = false;

      // if no loop
      if (nextIndex > state.storyLength - 1 && state.loop === true) {
        nextIndex = 0;
      }

      if (nextIndex > state.storyLength - 1 && state.loop === false) {
        nextIndex = state.storyLength - 1;
        pause = true;
      }

      return {
        ...state,
        currentIndex: nextIndex > state.storyLength - 1 ? 0 : nextIndex,
        pause: pause,
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
    setMuted: (state, action) => {
      return {
        ...state,
        muted: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setActiveVideoRef: (state, action) => {
      return {
        ...state,
        activeVideoRef: action.payload,
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
  setMuted,
  setLoading,
  setActiveVideoRef,
} = actions;

export default reducer;
