import httpXhr from "@/http/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

type User = {
  id: string;
  name: string;
  email: string;
};

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User}) => {
      state.user = action.payload;
      state.isLoggedIn = !!state.user;
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload.user;
      state.user = user || null;
      state.isLoggedIn = !!user;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      const user = action.payload.user;
      state.user = user || null;
      state.isLoggedIn = !!user;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      const user = action.payload.user;
      state.user = user || null;
      state.isLoggedIn = !!user;
    });
  },
});

const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    const response = await httpXhr.login(params);
    return response;
  }
);

const signUp = createAsyncThunk(
  "user/singUp",
  async (params: { email: string; password: string; name: string }) => {
    const response = await httpXhr.signup(params);
    return response;
  }
);


const logout = createAsyncThunk(
  "user/logout",
  async () => {
    const response = await httpXhr.logout();
    return response;
  }
);

const getProfile = createAsyncThunk("user/me", async () => {
  const response = await httpXhr.fetchUserInfo();
  return response;
});

export { login, getProfile, logout, signUp };

export const { setUser } = useSlice.actions;
export default useSlice.reducer;
