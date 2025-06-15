import { Dispatch, ReactNode, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';

interface Props {
  title: string;
  expanded: boolean;
  children: ReactNode;
  description?: string;
  childrenActions?: ReactNode;
  onToggle: Dispatch<SetStateAction<boolean>>;
}

export function Accordion({
  title,
  children,
  description,
  childrenActions,
  expanded = false,
  onToggle,
}: Props) {
  return (
    <MuiAccordion
      expanded={expanded}
      elevation={0}
      sx={{
        width: '100%',
      }}
      onChange={() => onToggle((prev) => !prev)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography component='span'>{title}</Typography>
          {description ? (
            <Typography component='span'>{description}</Typography>
          ) : null}
        </Box>
      </AccordionSummary>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}
      >
        {children}
      </Box>
      {childrenActions ? (
        <AccordionActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          {childrenActions}
        </AccordionActions>
      ) : null}
    </MuiAccordion>
  );
}
