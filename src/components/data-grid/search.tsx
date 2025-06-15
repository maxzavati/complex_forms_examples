import { useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import { useGridSearchParams } from '@/features/server-side-data-grid/hooks/use-search-params';

interface Props {
  onChange: (value: string) => void;
}

export function DataGridSearch({ onChange }: Props) {
  const { search, searchParams, setSearchParams } = useGridSearchParams();
  const [searchValue, setSearchValue] = useState(search);

  const debounced = useDebounceCallback(onChange, 500);

  const handleChange = (value: string) => {
    setSearchValue(value); // No delay
    debounced(value); // Delay for search params change that trigger fetch when chaning
    if (value) {
      searchParams.set('search', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const handleClear = () => {
    handleChange('');
  };

  return (
    <Box>
      <TextField
        placeholder='Search'
        variant='outlined'
        value={searchValue}
        onChange={(event) => handleChange(event.target.value)}
        sx={{ width: { xs: '100%', sm: 300 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                {search ? (
                  <IconButton
                    edge='end'
                    onClick={handleClear}
                    size='small'
                    sx={{ visibility: search ? 'visible' : 'hidden' }}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
