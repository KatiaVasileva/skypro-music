import { getToken, GetTokenProps, login, LoginProps, refreshToken, register, RegisterProps } from "@/api/userApi";
import { Tokens } from "@/types/Tokens.types";
import { User } from "@/types/User.types";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "@/utils/helpers";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStateType = {
  userState: User | null;
  isAuthState: boolean;
  errorMessage: string;
  tokens: Tokens | null;
};

const userFromLocalStorage: User | null = getUserFromLocalStorage();

const initialState: UserStateType = {
  userState: userFromLocalStorage,
  isAuthState: false,
  errorMessage: "",
  tokens: null,
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

export const token = createAsyncThunk(
  "user/token",
  async ({email, password} : GetTokenProps) => {
    return await getToken({email, password});
  }
);

// export const refresh = createAsyncThunk(
//   "user/refresh",
//   async (refresh: string) => {
//     return await refreshToken(refresh);
//   }
// )

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userState = action.payload;
      saveUserToLocalStorage(state.userState);
    },
    setTokens: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    },
    logout: (state) => {
      state.userState = null;
      state.isAuthState = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.userState = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.userState = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        const error = action.error;
        console.log(error);
        state.errorMessage = "Ошибка: " + action.error.message;
      });
  },
});

export const { setUser, setTokens, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
