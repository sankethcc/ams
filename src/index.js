import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider, closeSnackbar, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { theme } from './theme';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme = {theme}>
<SnackbarProvider
autoHideDuration={6000} maxSnack={7}
action={(snackbarId) => (
  <IconButton component="span" onClick={() => closeSnackbar(snackbarId)}>
  <CloseIcon sx={{color:'#fff'}} />
  </IconButton>
  
)}

>
    <App/>
    </SnackbarProvider>
  </ThemeProvider>
);
reportWebVitals();
