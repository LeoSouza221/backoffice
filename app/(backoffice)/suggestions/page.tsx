'use client'
import { useState, useMemo } from 'react'
import {
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { Box, Typography, Divider } from '@mui/material'
import MessageDialog from '@/components/message-dialog'
import PaginatedTable from '@/components/paginated-table'
import { repeat } from '@/util'

const suggestion = {
  title: 'Sugestão',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
}

export default function SuggestionsPage() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const suggestions = useMemo(() => {
    return repeat(10, (index) => ({ id: index.toString(), ...suggestion }))
  }, [])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Code',
      editable: true,
      minWidth: 100,
      flex: 1,
      hideSortIcons: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      editable: true,
      minWidth: 100,
      flex: 1,
      hideSortIcons: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      minWidth: 500,
      flex: 1,
      description: 'Clique to see the complete description',
      hideSortIcons: true,
      renderCell: ({ value }: GridRenderCellParams) => {
        return <MessageDialog selectedValue={value} />
      },
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
        Sugestões
      </Typography>
      <Divider />
      <PaginatedTable
        rows={suggestions ?? []}
        columns={columns}
        isLoading={false}
        rowCount={10}
        setPaginationModel={setPaginationModel}
        hideSearch={true}
        paginationModel={paginationModel}
      />
    </Box>
  )
}
