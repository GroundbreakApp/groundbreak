import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storyStateReducer from "../components/my-story/slices/story.slice";

const rootReducer = combineReducers({
  story: storyStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;