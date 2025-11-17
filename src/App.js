import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import SurveyApp from './components/SurveyApp';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SurveyApp />
    </ThemeProvider>
  );
}

export default App;
