import { GlobalStyles, useTheme } from '@mui/material';

const MuiGlobalStyles = () => {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
        'html, body': {
          minWidth: '375px',
          minHeight: '100svh',
          fontFamily: "'Inter', sans-serif",
          color: theme.palette.text.primary,
          background: theme.palette.background.default,
        },
      }}
    />
  );
};

export default MuiGlobalStyles;
