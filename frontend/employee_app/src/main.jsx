import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import { ThemeProvider } from '@emotion/react';
import darkTheme from "./theme.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </StrictMode>,
)
