import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    user,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

// export default store;
