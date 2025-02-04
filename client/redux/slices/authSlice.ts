import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const userLogin = createAsyncThunk(
  "users/login",
  async (body: any, { rejectWithValue }) => {
    try {
      var response = await axios.post(
        "http://192.168.1.4:3000/auth/signIn",
        body
      );
      return response;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const userRegister = createAsyncThunk(
  "users/register",
  async (body: any, { rejectWithValue }) => {
    try {
      var response = await axios.post(
        "http://192.168.1.4:3000/auth/signUp",
        body
      );
      return response;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
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
      SecureStore.deleteItemAsync("token");
    },
    setUser(state:any, action:any){
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: any, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state: any, action: any) => {
      var token = action.payload.data.token;
      var user = action.payload.data.user;
      state.user = user;
      state.isSuccess = true;
      state.isLoading = false;
      SecureStore.setItem("token", token);
      var stateToken = SecureStore.getItem("token");
      console.log(stateToken);
    });
    builder.addCase(userLogin.rejected, (state: any, action: any) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userRegister.pending, (state: any, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state: any, action: any) => {
      var token = action.payload.data.token;
      var user = action.payload.data.user;
      state.user = user;
      state.isSuccess = true;
      state.isLoading = false;
      SecureStore.setItem("token", token);
    });
    builder.addCase(userRegister.rejected, (state: any, action: any) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
