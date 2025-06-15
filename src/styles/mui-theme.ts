import { createTheme } from '@mui/material';

// Fixes outline label animation in Safari browser
const texfieldFixStyles = {
  '& .MuiOutlinedInput-notchedOutline': {
    transition: 'all 0.2s ease-in-out',
  },
};

const muiTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: texfieldFixStyles,
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: texfieldFixStyles,
      },
    },
  },
});

export default muiTheme;
