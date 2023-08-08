"use client"
import { useState, useCallback, useMemo } from 'react'
import {
  GridColDef,
  GridActionsCellItem,
  GridValueFormatterParams
} from '@mui/x-data-grid'
import { Box, Tooltip, Divider, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import UserForm from './user-form'
import PaginatedTable from '@/components/paginated-table'
import { repeat } from '@/util'

let timeout:any

interface IUser {
  name: string,
  email: string,
  phone: string,
  dateCreated?: string
  accountId?: number
}

const user = {
  email: 'test@gmail.com',
  name: 'Leonardo Souza',
  phone: '12345-3455',
  createdAt: new Date()
}

export default function UsersPage() {
  const [isCreate, setIsCreate] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedUser, setSelectedUser] = useState<IUser>({ name: '', email: '', phone: '' })
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const users = useMemo(() => {
    return repeat(10, (index) => ({ id: index.toString(), ...user }))
  }, [])

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', editable: true, minWidth: 300, flex: 1, hideSortIcons: true },
    { field: 'name', headerName: 'Name', editable: true, minWidth: 300, flex: 1, hideSortIcons: true  },
    { field: 'phone', headerName: 'Phone Number', editable: true, width: 150, hideSortIcons: true  },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 130,
      hideSortIcons: true,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        return new Date(params.value).toLocaleDateString()
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      align: 'center',
      width: 130,
      cellClassName: 'actions',
      hideSortIcons: true,
      getActions: (params) => {
        return [
          <Tooltip key={`edit-${params.id}`} title="Editar" placement="top">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Delete"
              onClick={() => handleEdit(params.row)}
              color="inherit"
            />
          </Tooltip>,
        ]
      },
    },
  ]

  const handleOpenAndCloseUserForm = useCallback((updateTable?: boolean) => {
    setOpen(!open)

    if (open && isCreate) {
      setIsCreate(false)
    }
  }, [isCreate, open])

  const handleEdit = (params: IUser) => {
    setSelectedUser(params)
    handleOpenAndCloseUserForm()
  }

  const resetPagination = () => {
    setPaginationModel({
      pageSize: 10,
      page: 0,
    })
  }

  const handleSearch = (value: string) => {
    setSearchText(value)

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      resetPagination()
    }, 1500)
  }

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
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Usuários</Typography>
      <Divider />
      <UserForm open={open} isCreate={isCreate} handleOpenClose={handleOpenAndCloseUserForm} user={selectedUser} />
      <PaginatedTable
        rows={users ?? []}
        columns={columns}
        isLoading={false}
        rowCount={10}
        setPaginationModel={setPaginationModel}
        searchText={searchText}
        handleSearch={handleSearch}
        paginationModel={paginationModel}
        hideSearch
      />
    </Box>
  )
}