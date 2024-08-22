import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../services/api";

export const authenticate = createAsyncThunk("auth/login", async (data) => {
  return login(data).then((result) => result);
});

const initialState = {
  isFetching: false,
  token: "",
  message: "",
  twoFactor: false,
  rol: null,
  nombre: null,
  profile: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => initialState,
    resetTwoFactor: (state) => {
      state.twoFactor = initialState.twoFactor;
    },
    // logoutApp: () => {
    //   logout().finally(() => {
    //     window.location.reload();
    //   });

    //   return initialState;
    // },
    logoutApp: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state, _action) => {
        state.isFetching = true;
        state.message = "";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isFetching = false;
        
        if (action?.payload?.msj === "ok") {
          
          if (!!action?.payload?.access_token) {
            state.token = action.payload.access_token;
            state.nombre  = action.payload.nombre;
            state.rol   = action.payload.rol;
          }
          
        } else
          state.message =
            action.payload.message === "Invalid login details."
              ? "Usuario y/o contraseña inválido."
              : action.payload.message;
      })
      .addCase(authenticate.rejected, (state, _action) => {
        state.isFetching = false;
      })
  },
});

export const { logoutApp, resetTwoFactor, resetState } = authSlice.actions;

export default authSlice.reducer;
