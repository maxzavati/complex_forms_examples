import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useGridPaginationParams() {
  const [searchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const limitFromUrl = Number(searchParams.get('limit')) || 25;

  const [page, setPage] = useState(pageFromUrl);
  const [rowsPerPage, setRowsPerPage] = useState(limitFromUrl);

  return { page, setPage, rowsPerPage, setRowsPerPage };
}
