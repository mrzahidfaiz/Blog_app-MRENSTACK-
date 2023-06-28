import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  username: "",
  email: "",
  auth: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { _id, name, email, username, auth, message } = action.payload;

      state._id = _id;
      state.name = name;
      state.email = email;
      state.username = username;
      state.auth = auth;
      state.message = message;
    },
    logoutUser(state) {
      state._id = '';
      state.name = '';
      state.email = '';
      state.username = '';
      state.auth = '';
      state.message = '';
    }
  },
});

export const {setUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;
