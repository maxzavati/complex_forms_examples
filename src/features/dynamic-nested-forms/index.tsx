import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SurveyForm } from './components';

export function DynamicNestedFormsView() {
  return (
    <Box
      component='main'
      sx={{
        py: 10,
        maxWidth: 700,
        marginX: 'auto',
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          textAlign: 'center',
          mb: 3,
        }}
      >
        Dynamic Nested Forms
      </Typography>

      <SurveyForm />
    </Box>
  );
}
