import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'NameSmile, Verdana'
  },
  menuColors: {
    equipmentBackgroundColor: 'rgb(41,41,41)',
    menuBorderColor: 'rgb(103,103,103)',
    menuBackgroundColor: 'rgba(10 10 10 /  90%)',
  },
  smallSize: '620px'
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);