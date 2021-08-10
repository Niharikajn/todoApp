import React from 'react'
import {ThemeProvider, createTheme}  from '@material-ui/core';
import teal from "@material-ui/core/colors/teal";
import TodoComponent from './components/TodoComponent';

const theme = createTheme({
  palette: {
    primary: teal,
    type: "light" // Switching the dark mode on is a single property value change.
  }
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <TodoComponent />
  </ThemeProvider>
  )
}

export default App;