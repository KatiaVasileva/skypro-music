import { login, LoginProps, register, RegisterProps } from "@/api/userApi";
import { User } from "@/types/User.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStateType = {
  userState: User | null;
};

const initialState: UserStateType = {
  userState: null,
};

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password, username }: RegisterProps) => {
    return await register({ email, password, username });
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }: LoginProps) => {
    return await login({ email, password });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userState = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.userState = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.userState = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
