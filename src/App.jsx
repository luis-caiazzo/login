import './App.css'

import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Router from "./router/AppRouter";
import store from "./store";

import {
  ThemeProvider,
} from "@mui/material";

import theme from "./theme/light";

let persistor = persistStore(store);

function App() {
  
  return (
    <ReduxProvider store={store}>
      <PersistGate
      persistor={persistor}
    >
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </PersistGate>
  </ReduxProvider>
  )
}

export default App
