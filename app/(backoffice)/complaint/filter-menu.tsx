import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Tooltip,
  IconButton,
  Menu,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { FilterList, CleaningServices, FilterAlt, Close } from '@mui/icons-material'
import { useFormik } from 'formik'
import { IFilterMenuProps } from './types'
import useFetch from '@/api/useFetch'
import 'dayjs/locale/pt-br'

export default function FilterMenu({ handleFilterComplaint }: IFilterMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { data, isLoading } = useFetch(`/api/casinos`, 'GET')

  const formik = useFormik({
    initialValues: {
      player: '',
      dateStart: dayjs().subtract(30, 'days'),
      dateEnd: dayjs(),
      casino: '',
      complaintId: '',
    },
    onSubmit: (values) => {
      handleFilterComplaint({
        ...values,
        // @ts-ignore: Unreachable code error
        dateStart: values.dateStart.format('YYYY-MM-DD'),
        // @ts-ignore: Unreachable code error
        dateEnd: values.dateEnd.format('YYYY-MM-DD'),
      })
    },
  })

  const filteredCasinos = useMemo(() => {
    if (data && data.length) {
      return data.filter((casino: any) => casino.casinoId)
    }

    return []
  }, [data])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClean= () => {
    formik.resetForm()
    formik.handleSubmit()
    handleClose()
  }
  const handleClearField = (field: string) => {
    formik.setFieldValue(field, '')
  }
  const handleClearFieldComponent = (field: string) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="clear field"
          onClick={() => handleClearField(field)}
          edge="end"
        >
          {/* @ts-ignore: Unreachable code error */}
          {formik.values[field].length ? <Close /> : <></>}
        </IconButton>
      </InputAdornment>
    )
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          PaperProps={{
            elevation: 0,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          
        >
          <Box sx={{ paddingX: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterAlt />
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontWeight: 600, ml: 1 }}
              >
                Filtros
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              size="small"
            >
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{
              padding: 2,
              paddingBottom: 0,
              width: '320px'
            }}
          >
            <Box sx={{ paddingBottom: 2 }}>
              <DatePicker
                label="Data inicial"
                value={dayjs(formik.values.dateStart)}
                onChange={(value) => {
                  formik.setFieldValue("dateStart", value, true)
                }}
                disableFuture
                sx={{ width: '100%' }}
              />
            </Box>
            <DatePicker
              label="Data Final"
              value={dayjs(formik.values.dateEnd)}
              onChange={(value) => {
                formik.setFieldValue("dateEnd", value, true)
              }}
              disableFuture
              sx={{ width: '100%' }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="player"
              label="Nome do jogador"
              type="text"
              id="player"
              value={formik.values.player}
              onChange={formik.handleChange}
              sx={{ paddingBottom: 1, }}
              InputProps={{
                endAdornment: handleClearFieldComponent('player')
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="casino-label">Cassino</InputLabel>
              <Select
                labelId="casino-label"
                name="casino"
                id="casino"
                label="Cassino"
                value={formik.values.casino}
                onChange={formik.handleChange}
                disabled={isLoading}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {filteredCasinos.map((casino: any) => (
                  <MenuItem value={casino.casinoId} key={casino.casinoId}>{ casino.name }</MenuItem>
                ))
                }
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              name="complaintId"
              label="Código"
              type="text"
              id="complaintId"
              value={formik.values.complaintId}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: handleClearFieldComponent('complaintId')
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained"
                color="error"
                startIcon={<CleaningServices />}
                sx={{
                  textTransform: 'capitalize',
                }}
                onClick={handleClean}
              >
                Limpar
              </Button>
              <Button
                color="success"
                variant="contained"
                startIcon={<FilterAlt />}
                type="submit"
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                Filtrar
              </Button>
            </Box>
          </Box>
        </Menu>
      </LocalizationProvider>
    </>
  )
}