"use client"
import {
  GridRowsProp,
  GridColDef,
  DataGrid,
  gridClasses,
  GridPaginationModel
} from '@mui/x-data-grid'
import SearchToolbar from '@/components/search-toolbar'

const localeTexts = {
  columnMenuSortAsc: 'Ordenação Crescente',
  columnMenuSortDesc: 'Ordenação Decrescente',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Esconder coluna',
  columnMenuManageColumns: 'Gerenciar colunas',
  columnsPanelTextFieldLabel: 'Encontrar coluna',
  columnsPanelTextFieldPlaceholder: 'Título',
  columnsPanelShowAllButton: 'Mostrar todos',
  columnsPanelHideAllButton: 'Esconder todos',
  noRowsLabel: 'Sem dados',
  noResultsOverlayLabel: 'Sem dados',
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
}

interface IPaginatedTableProps {
  isLoading: boolean
  hideSearch?: boolean
  searchText?: string
  customId?: string
  rowCount: number
  rows: GridRowsProp
  columns: GridColDef[]
  setPaginationModel: React.Dispatch<React.SetStateAction<any>>
  handleSearch?: (value: string) => void
  paginationModel?: GridPaginationModel
}

export default function PaginatedTable({ rows, columns, isLoading, rowCount, setPaginationModel, searchText, customId, handleSearch, paginationModel, hideSearch }: IPaginatedTableProps) {
  return (
    <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        loading={isLoading}
        rowCount={rowCount}
        disableColumnFilter={true}
        disableColumnMenu={true}
        initialState={{
          pagination: {paginationModel},
        }}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
        hideFooterSelectedRowCount={true}
        autoHeight={true}
        getRowHeight={() => 'auto'}
        getRowId={(row) => {
          if (customId) return row[customId]
          if (row.id) return row.id
          return row._id
        }}
        paginationMode="server"
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
            borderBottom: 'none',
            color: 'text.secondary'
          },
          [`& .${gridClasses.columnHeaderTitle}`]: {
            fontWeight: 600,
          },
          mt: 1,
          backgroundColor: 'background.paper',
          fontWeight: 600,
        }}
        slots={{ toolbar: hideSearch ? () => <></> : SearchToolbar }}
        slotProps={{
          toolbar:  {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (hideSearch) return

              if (handleSearch) handleSearch(event.target.value)
            }
          },
        }}
        localeText={localeTexts}
      />
  )
}
