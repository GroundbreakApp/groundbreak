import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storyStateReducer from "../components/my-story/slices/story.slice";
import newStoryState from "../components/new-story/slices/story.slice";
import week4State from "../components/new-story/slices/week4.slice";

const rootReducer = combineReducers({
  story: storyStateReducer,
  newStory: newStoryState,
  week4: week4State,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;
