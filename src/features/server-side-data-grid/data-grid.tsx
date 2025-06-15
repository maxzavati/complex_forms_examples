import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { GridColDef } from '@mui/x-data-grid';

import { Loader } from '@/components/ui/loader';
import { DataGrid } from '@/components/data-grid';
import { NoResults } from '@/components/ui/no-results';
import { getSurveys } from '../../apis/endpoints';
import { SurveyListItem } from '../../apis/types';
import { useGridPaginationParams } from '@/features/server-side-data-grid/hooks/use-pagination-params';

interface Props {
  searchQuery: string;
}

export function DataGridContainer({ searchQuery }: Props) {
  const navigate = useNavigate();
  const { page, rowsPerPage, setPage, setRowsPerPage } =
    useGridPaginationParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getSurveys', page, rowsPerPage, searchQuery],
    queryFn: () =>
      getSurveys({
        page,
        search: searchQuery,
        limit: rowsPerPage,
      }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.total) {
    return <NoResults error={error?.message} />;
  }

  type ColumnItem = (typeof data.list)[number];

  const columns: GridColDef<ColumnItem>[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      filterable: false,
      valueGetter: (value) => value,
    },
    {
      width: 500,
      field: 'description',
      headerName: 'Description',
      sortable: false,
      filterable: false,
      valueGetter: (value) => value,
    },
  ];

  return (
    <DataGrid<SurveyListItem>
      columns={columns}
      rows={data.list}
      totalRowCount={data.total}
      onPageChange={setPage}
      onPageSizeChange={setRowsPerPage}
      onRowClick={(params) => navigate(`surveys/${params.id}`)}
    />
  );
}
