import { signin } from "@/api/userApi";
import { User } from "@/types/User.types";
import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
  userState: User | null;
};

const initialState: UserStateType = {
  userState: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userState = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.userState = action.payload;
    })
    .addCase(signin.rejected, (state, action) => {
        console.error('Error:', action.error.message); 
    });
  },
});

export const {logout} = userSlice.actions;
export const userReducer = userSlice.reducer;
