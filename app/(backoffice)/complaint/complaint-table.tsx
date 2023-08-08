"use client"
import {useState, useMemo, useEffect} from 'react'
import {
  GridColDef,
  GridActionsCellItem,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import { Tooltip } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import PaginatedTable from '@/components/paginated-table'
import { useRouter } from 'next/navigation'
import { IComplaintTableProps } from './types'
import { repeat } from '@/util'

const complaint = {
  casino: 'Blaze',
  game: 'Double',
  user: 'Leonardo',
  createdAt: new Date(),
  description: 'Blaze cade meu dinheiro'
}

export default function ComplaintTable({ status, filters }: IComplaintTableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const router = useRouter()
  // const params = new URLSearchParams([
  //   ['page',(paginationModel.page + 1).toString()],
  //   ['limit', paginationModel.pageSize.toString()],
  //   ['status', status],
  //   ['casinoId', filters.casino],
  //   ['complaintId', filters.complaintId],
  //   ['player', filters.player],
  //   ['startDate', filters.dateStart],
  //   ['endDate', filters.dateEnd],
  // ]).toString()
  // const { data, isLoading, mutate } = useFetch(
  //   `/api/complaints?${params}`,
  //   'GET'
  // )

  useEffect(() => {
    handleUpdateTable()
  }, [filters])

  const complaints = useMemo(() => {
    return repeat(10, (index) => ({ id: index.toString(), ...complaint }))
  }, [])

  const handleUpdateTable = () => {
    return
  }

  const handleRedirectToComplaitDetail = (id: string) => () => {
    router.push(`complaint/${id}`)
  }

  const columns = useMemo((): GridColDef[] => {
    return [
      { field: 'id', headerName: 'Id', editable: true, hideSortIcons: true, align: 'left', },
      { 
        field: 'casino',
        headerName: 'Cassino',
        width: 200,
        hideSortIcons: true,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: (
          params: GridValueFormatterParams<{ name: string }>
        ) => {
          if (params.value == null) {
            return ''
          }

          return params.value.name
        },
      },
      {
        field: 'game',
        headerName: 'Game',
        editable: true,
        width: 100,
        hideSortIcons: true,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: (params: GridValueFormatterParams<{ name: string }>) => {
          if (params.value == null) {
            return '';
          }

          return params.value.name
        },
      },
      { field: 'user',
        headerName: 'Player',
        minWidth: 300,
        flex: 1,
        hideSortIcons: true,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: (
          params: GridValueFormatterParams<{ name: string }>
        ) => {
          if (params.value == null) {
            return ''
          }

          return params.value.name
        },
      },
      {
        field: 'createdAt',
        headerName: 'Date',
        width: 130,
        hideSortIcons: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value == null) {
            return ''
          }

          return new Date(params.value).toLocaleDateString()
        },
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'description',
        headerName: 'Description',
        hideSortIcons: true,
        type: 'string',
        minWidth: 300,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: (params: GridValueFormatterParams<string>) => {
          if (params.value == null) {
            return ''
          }

          return params.value.length > 50
            ? `${params.value.substring(0, 50)}...`
            : params.value
        },
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Ações',
        align: 'center',
        width: 100,
        cellClassName: 'actions',
        hideSortIcons: true,
        getActions: ({ id }) => {
          return [
            <Tooltip key={id} title="Detalhar" placement="top">
              <GridActionsCellItem
                icon={<ArrowOutwardIcon />}
                label="Detail"
                onClick={handleRedirectToComplaitDetail(id as string)}
                color="inherit"
              />
            </Tooltip>,
          ]
        },
      },
    ]
  }, [])

  return (
    <PaginatedTable
      rows={complaints ?? []}
      columns={columns}
      isLoading={false}
      rowCount={10}
      setPaginationModel={setPaginationModel}
      hideSearch={true}
      paginationModel={paginationModel}
    />
  )
}
