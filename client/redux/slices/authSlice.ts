import { signIn } from "@/api/auth/auth_calls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const userLogin = createAsyncThunk("users/login", async (body) => {
  const signInFunction = signIn();
  const response = await signInFunction.mutate(body);
  return response;
});
interface UsersState {
  user: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
} satisfies UsersState as UsersState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: any, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state: any, action: any) => {
      var token = action.payload.data.data.token;
      var user = action.payload.data.data.user;
      state.user = user;
      state.isSuccess = true;
      state.isLoading = false;
      SecureStore.setItem("token", token);
    });
    builder.addCase(userLogin.rejected, (state: any, action: any) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
