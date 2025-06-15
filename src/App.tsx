import router from './router';
import muiTheme from './styles/mui-theme';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import MuiGlobalStyles from './styles/mui-global';
import { QueryContextProvider } from './contexts/query-client';

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <MuiGlobalStyles />
      <QueryContextProvider>
        <RouterProvider router={router} />
      </QueryContextProvider>
    </ThemeProvider>
  );
}

export default App;
