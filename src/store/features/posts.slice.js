import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePosts: [],
  userPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    storeActivePosts(state, action) {
      state.activePosts = action.payload;
    },

    addActivePost(state, action) {
      state.activePosts.push(action.payload);
    },

    updateActivePost(state, action) {
      if (action.payload.post.status === "inactive") {
        state.activePosts = state.activePosts.filter(
          (post) => post.$id != action.payload.postId
        );
        return;
      }

      const postIndex = state.activePosts.findIndex(
        (post) => post.$id === action.payload.postId
      );

      postIndex >= 0
        ? (state.activePosts[postIndex] = action.payload.post)
        : state.activePosts.push(action.payload.post);
    },

    storeUserPosts(state, action) {
      state.userPosts = action.payload;
    },

    addUserPost(state, action) {
      state.userPosts.push(action.payload);
    },

    updateUserPost(state, action) {
      const postIndex = state.userPosts.findIndex(
        (post) => post.$id === action.payload.postId
      );
      state.userPosts[postIndex] = action.payload.post;
    },
  },
});

export const {
  storeActivePosts,
  addActivePost,
  updateActivePost,
  storeUserPosts,
  addUserPost,
  updateUserPost,
} = postsSlice.actions;
export default postsSlice.reducer;
