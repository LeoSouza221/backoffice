"use client"
import {useCallback, useState} from 'react'
import { Box, Typography, Divider, Grid, Tabs, Tab } from '@mui/material'
import ComplaintTable from './complaint-table'
import FilterMenu from './filter-menu'
import { ComplaintStatus, IFilterItems } from './types'
import dayjs from 'dayjs'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

const tablesStatus = ["NOT_ANSWERED", "ANSWERED", ""]

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function ComplaintPage() {
  const [value, setValue] = useState(0)
  const [filters, setFilters] = useState<IFilterItems>({
    player: '',
    dateStart: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
    dateEnd: dayjs().format('YYYY-MM-DD'),
    casino: '',
    complaintId: '',
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleFilterComplaint = useCallback((searchFilters: IFilterItems) => {
    setFilters(searchFilters)
  }, [filters])

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
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Reclamações</Typography>
      <Divider />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={2}>
          <Grid item xs={11} md={10}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Tipo reclamações"
              variant="scrollable"
              allowScrollButtonsMobile
            >
              <Tab label="Não Respondidas" {...a11yProps(0)} />
              <Tab label="Respondidas" {...a11yProps(1)} />
              <Tab label="Todas" {...a11yProps(2)} />
            </Tabs>
          </Grid>
          <Grid item xs={1} md={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", height: '100%'}}>
              <FilterMenu handleFilterComplaint={handleFilterComplaint} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {tablesStatus.map((status, index) => (
        <TabPanel value={value} index={index} key={index}>
          <ComplaintTable status={status as ComplaintStatus} filters={filters} />
        </TabPanel>
      ))}
    </Box>
  )
}