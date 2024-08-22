import { createBreakpoints } from "@mui/system";

import { createTheme } from "@mui/material/styles";

const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#0f60ff",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          display: "flex",
          width: "100%",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          flex: 1,
          [breakpoints.down("sm")]: {
            fontSize: "x-small",
          },
        },
      },
    },
  },
});

export default theme;
