import { useState } from 'react';

import Box from '@mui/material/Box';

import { DataGridContainer } from './data-grid';
import { DataGridSearch } from '@/components/data-grid/search';
import { useGridSearchParams } from '@/features/server-side-data-grid/hooks/use-search-params';

export function ServerSideDataGridView() {
  const { search } = useGridSearchParams();
  const [searchQuery, setSearchQuery] = useState(search);

  return (
    <Box component='main'>
      <DataGridSearch onChange={setSearchQuery} />
      <DataGridContainer searchQuery={searchQuery} />
    </Box>
  );
}
