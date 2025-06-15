import { useSearchParams } from 'react-router-dom';

import {
  GridColDef,
  GridRowParams,
  GridValidRowModel,
  GridPaginationModel,
  DataGrid as MuiDataGrid,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface DataGridProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
  totalRowCount: number;
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  onRowClick: (params: GridRowParams<T>) => void;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export function DataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  totalRowCount,
  onRowClick,
  onPageChange,
  onPageSizeChange,
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
}: DataGridProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationModel: GridPaginationModel = {
    page: parseInt(searchParams.get('page') || '1', 10) - 1, // MUI uses 0-based index
    pageSize: parseInt(searchParams.get('pageSize') || '25', 10),
  };

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    const newParams = new URLSearchParams(searchParams);
    const newPage = newModel.page + 1; // Convert to 1-based index
    const newPageSize = newModel.pageSize;

    newParams.set('page', newPage.toString());
    newParams.set('pageSize', newPageSize.toString());
    setSearchParams(newParams);

    // Notify parent component about changes
    onPageChange(newPage);
    onPageSizeChange(newPageSize);
  };

  return (
    <Paper
      sx={(theme) => ({
        maxWidth: { xs: 'calc(100vw - 16px)', sm: 'calc(100vw - 116px)' },
        backgroundColor: theme.palette.custom.primary,
      })}
    >
      <MuiDataGrid
        rows={rows}
        columns={columns}
        onRowClick={onRowClick}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        // Pagination
        paginationMode='server'
        rowCount={totalRowCount}
        paginationModel={paginationModel}
        pageSizeOptions={[25, 50]}
        onPaginationModelChange={handlePaginationModelChange}
        // Styles
        sx={(theme) => ({
          '& .MuiDataGrid-root, & .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer, & .MuiDataGrid-row, & .MuiDataGrid-filler':
            {
              backgroundColor: theme.palette.custom.primary,
            },
        })}
      />
    </Paper>
  );
}
