import { createSlice } from "@reduxjs/toolkit";
import { Story } from "../types";

type IStoryState = {
  stories: Array<Story>;
  playbackId: string | null;
  pause: boolean;
  currentId: number;
  loop: boolean;
  muted: boolean;
  loading: boolean;
};

const initialState: IStoryState = {
  stories: [],
  playbackId: null,
  pause: true,
  currentId: 0,
  loop: false,
  muted: false,
  loading: false,
};

const storyStateSlice = createSlice({
  name: "new-story-component",
  initialState,
  reducers: {
    setStories: (state, action) => ({
      ...state,
      stories: action.payload,
    }),
    setPlaybackId: (state, action) => ({
      ...state,
      playbackId: action.payload,
    }),
    setPause: (state, action) => ({
      ...state,
      pause: action.payload,
    }),
    setCurrentId: (state, action) => ({
      ...state,
      currentId: action.payload,
    }),
    nextSlide: (state) => {
      let nextIndex = state.currentId + 1;

      // if no loop
      if (nextIndex > state.stories.length - 1 && state.loop === true) {
        nextIndex = 0;
      }

      if (nextIndex > state.stories.length - 1 && state.loop === false) {
        nextIndex = state.stories.length - 1;
      }

      return {
        ...state,
        currentId: nextIndex > state.stories.length - 1 ? 0 : nextIndex,
      };
    },
    prevSlide: (state) => {
      const currentId = state.currentId - 1;

      return {
        ...state,
        currentId: currentId < 0 ? state.stories.length - 1 : currentId,
      };
    },
    setMuted: (state, action) => ({
      ...state,
      muted: action.payload,
    }),
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

const { reducer, actions } = storyStateSlice;

export const {
  setStories,
  setPlaybackId,
  setPause,
  nextSlide,
  prevSlide,
  setCurrentId,
  setMuted,
  setLoading,
} = actions;

export default reducer;
