// theme.js
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e2f",
    },
    primary: {
      main: "#1976d2",
    },
    error: {
      main: "#f44336",
    },
  },
});

export default darkTheme;
