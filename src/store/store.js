import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth.slice.js";
import postsSliceReducer from "./features/posts.slice.js";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    posts: postsSliceReducer,
  },
});
