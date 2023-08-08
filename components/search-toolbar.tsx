"use client"
import {
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
import Box from '@mui/material/Box'

interface ISearchToolbar {
  onChange: () => void;
  value: string;
}

export default function SearchToolbar({ onChange, value }: ISearchToolbar) {
  return (
    <Box
      sx={{
        p: 2,
        pb: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        minWidth: 300,
        maxWidth: 500
      }}
    >
      <GridToolbarQuickFilter
        debounceMs={200}
        sx={{ width: '100%' }}
        placeholder="Pesquisar"
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}
