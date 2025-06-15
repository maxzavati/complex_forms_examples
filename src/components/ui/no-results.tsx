import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useGridSearchParams } from '@/features/server-side-data-grid/hooks/use-search-params';

interface Props {
  error?: string;
}

export function NoResults({ error }: Props) {
  const { search } = useGridSearchParams();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '100px',
      }}
    >
      {error ? (
        <Box>
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'red',
              marginBottom: 1,
            }}
          >
            {error}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
            }}
          >
            Please fresh the page or try again later.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: 1,
            }}
          >
            No results found
          </Typography>
          {search ? (
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              Please try another search
            </Typography>
          ) : null}
        </Box>
      )}
    </Box>
  );
}
