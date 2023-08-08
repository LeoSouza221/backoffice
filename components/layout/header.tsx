import { useContext } from 'react'
import { Box, Stack, AppBar, Toolbar, IconButton, AppBarProps, Switch } from '@mui/material'
import { Menu, ExitToApp } from '@mui/icons-material'
import { styled, useTheme } from '@mui/material/styles'
import { ColorModeContext } from './index'
import { useApp } from "@/components/layout"
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

interface IHeaderProps {
  handleOpenCloseSidebar: () => void
}

const StyledAppBar = styled((props: AppBarProps) => (
  <AppBar {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '0 0 10px 10px',
}))

export default function Header({ handleOpenCloseSidebar }: IHeaderProps) {
  const colorMode = useContext(ColorModeContext)
  const theme = useTheme()
  const { logout } = useApp()

  return (
    <StyledAppBar elevation={0}>
      <Toolbar>
        <IconButton
          onClick={() => handleOpenCloseSidebar()}
          sx={{
            mr: 1,
            display: { lg: 'none' },
          }}
          color="primary"
        >
          <Menu />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ marginRight: 2, alignItems: 'center', display: 'flex' }}>
          <Switch
            checked={theme.palette.mode === 'light'}
            onChange={colorMode.toggleColorMode}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          {theme.palette.mode === 'light' ? (
            <LightModeIcon sx={{ color: 'text.secondary', }} />
          ) : (
            <DarkModeIcon sx={{ color: 'text.secondary', }} />
          )}
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton
            onClick={logout}
            color="primary"
          >
            <ExitToApp></ExitToApp>
          </IconButton>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  )
}