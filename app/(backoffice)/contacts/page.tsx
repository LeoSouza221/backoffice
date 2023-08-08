"use client"
import {useState, useCallback, useMemo} from 'react'
import {
  GridColDef,
  GridRenderCellParams, GridValueFormatterParams,
} from '@mui/x-data-grid'
import { Box, Typography, Divider } from '@mui/material'
import {useApp} from "@/components/layout"
import MessageDialog from '@/components/message-dialog'
import DeleteModal from '@/components/delete-modal'
import PaginatedTable from '@/components/paginated-table'
import useFetch from '@/api/useFetch'
import useMutation from '@/api/useMutation'

let timeout:any

export default function ContactsPage() {
  const [searchText, setSearchText] = useState('')
  const [deleteId] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const { handleOpenSnackbar } = useApp()
  const { data, isLoading, mutate } = useFetch(`/api/contacts?_quantity=50`, 'GET')
  const { isLoading: isDeleting, trigger } = useMutation(`api/contacts/delete/${deleteId}`, 'DELETE')
  const handleOpenCloseDelete = useCallback(() => {

    setOpenDelete(!openDelete)
  }, [openDelete])

  const contacts = useMemo(() => {
    if (searchText.length) {
      return data.data.filter((user) => JSON.stringify(user.firstname).toString().toLowerCase().includes(searchText))
    }

    return data?.data ?? []
  }, [searchText, data])

  const handleDelete =  useCallback(async () => {
    try {
      const result = await trigger()

      if (result === 204) {
        handleOpenCloseDelete()
        handleOpenSnackbar('success', 'Usuário excluído com sucesso')
        mutate()
      }
    } catch (e) {
      // error handling
      handleOpenSnackbar('error', 'Erro ao excluir contato')
    }
  }, [deleteId])

  const handleSearch = (value: string) => {
    setSearchText(value)

    clearTimeout(timeout)
  }

  const columns: GridColDef[] = [
      { 
        field: 'firstname',
        headerName: 'Name',
        editable: true,
        minWidth: 150,
        flex: 1,
        hideSortIcons: true,
      },
      { 
        field: 'lastname',
        headerName: 'Lastname',
        editable: true,
        minWidth: 150,
        flex: 1,
        hideSortIcons: true,
      },
      { field: 'phone', headerName: 'Phone Number', editable: true, width: 200, hideSortIcons: true, },
      {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        minWidth: 300,
        flex: 1,
        description: 'Clique no botão para visualizar a mensagem completa',
        hideSortIcons: true,
        renderCell:	({ value }: GridRenderCellParams) => {
          const completeAddress = `${value.street}, ${value.city}`
          return (
            <MessageDialog selectedValue={completeAddress} />
          )
        }
      },
      {
        field: 'birthday',
        headerName: 'Birthday',
        width: 130,
        hideSortIcons: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value == null) {
            return '';
          }

          return new Date(params.value).toLocaleDateString()
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
      <DeleteModal open={openDelete} handleOpenClose={handleOpenCloseDelete} isLoading={isDeleting} handleDelete={handleDelete}/>
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Contacts</Typography>
      <Divider />
      <PaginatedTable
        rows={contacts ?? []}
        columns={columns}
        isLoading={isLoading}
        rowCount={paginationModel.pageSize}
        setPaginationModel={setPaginationModel}
        searchText={searchText}
        handleSearch={handleSearch}
        paginationModel={paginationModel}
      />
    </Box>
  )
}