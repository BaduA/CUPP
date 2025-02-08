import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const userLogin = createAsyncThunk(
  "users/login",
  async (body: any, { rejectWithValue }) => {
    try {
      var response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_LOCALHOST_ADDRESS}:3000/auth/signIn`,
        body
      );
      var token = await SecureStore.setItemAsync("token", response.data.token);
      console.log(response.data.token)
      console.log(token)
      console.log(token)
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
        `http://${process.env.EXPO_PUBLIC_LOCALHOST_ADDRESS}:3000/auth/signUp`,
        body
      );
      await SecureStore.setItemAsync("token", response.data.token);
      return response;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "users/getCurrent",
  async (body: any, { rejectWithValue }) => {
    try {
      const client = axios.create({
        baseURL: `http://${process.env.EXPO_PUBLIC_LOCALHOST_ADDRESS}:3000/`,
      });
      client.interceptors.request.use(async function (config) {
        let token = await SecureStore.getItemAsync("token");
        if (token) config.headers.Authorization = "Bearer " + token;
        return config;
      });
      var response = await client.get(`/auth/getCurrentUser`);
      return response;
    } catch (err) {
      await SecureStore.deleteItemAsync("token");
      throw rejectWithValue(err);
    }
  }
);
async function deleteToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}
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
      deleteToken("token");
    },
    setUser(state: any, action: any) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: any, action: any) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(userLogin.fulfilled, (state: any, action: any) => {
      var user = action.payload.data.user;
      state.user = user;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(userLogin.rejected, (state: any, action: any) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    });
    builder.addCase(userRegister.pending, (state: any, action: any) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(userRegister.fulfilled, (state: any, action: any) => {
      var user = action.payload.data.user;
      state.user = user;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(userRegister.rejected, (state: any, action: any) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    });
    builder.addCase(getCurrentUser.pending, (state: any, action: any) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getCurrentUser.fulfilled, (state: any, action: any) => {
      var user = action.payload.data;
      state.user = user;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getCurrentUser.rejected, (state: any, action: any) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
