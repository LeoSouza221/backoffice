"use client"
import {useState, useCallback, useMemo, createContext, useContext, useEffect} from 'react'
import {createTheme} from '@mui/material/styles'
import {PaletteMode} from "@mui/material"
import {ThemeProvider} from "@mui/system"
import {styled} from '@mui/material/styles'
import { getDesignTokens } from '@/util'
import { CircularProgress, Box } from '@mui/material'
import SnackbarAlert from '@/components/snackbar-alert/'
import { SnackbarType } from '@/components/snackbar-alert/types'
import { ptBR } from '@mui/material/locale';
import Header from './header'
import Sidebar from './sidebar'

interface AppContextInterface {
  handleOpenSnackbar: (type: SnackbarType, message: string) => void
  logout: () => void
}

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92
const AppContext = createContext({} as AppContextInterface)

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  position: 'relative'
})

const Main = styled('div')(({theme}) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100vh',
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  backgroundColor: theme.palette.background.default
}))

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function BaseLayout({children}: any) {
  const [ hasWindow, setHasWindow ] = useState(false)
  const [mode, setMode] = useState<PaletteMode>('light')
  const [isSidebarOpen, setOpen] = useState(false)
  const [open, setOpenSnackbar] = useState(false)
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success')
  const [message, setMessage] = useState('')

  const theme = useMemo(() => createTheme(getDesignTokens(mode), ptBR), [mode])

  useEffect(() => {
    setHasWindow(!!window && typeof window !== 'undefined')
  }, [])

  useEffect(() => {
    setMode(localStorage.getItem('theme') as PaletteMode ?? 'light')
  }, [])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        )
      },
    }),
    [mode],
  )

  useEffect(() => {
    if (hasWindow) {
      localStorage.setItem('theme', mode)
    }
  }, [mode])


  const handleOpenCloseSidebar = useCallback(() => {
    setOpen(!isSidebarOpen)
  }, [isSidebarOpen])

  const handleOpenSnackbar = useCallback((type: SnackbarType, message: string) => {
    setOpenSnackbar(true)
    setSnackbarType(type)
    setMessage(message)
  }, [message, open, snackbarType])

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  }

  const logout = () => {
    localStorage.removeItem('isLogged')
    window.location.href = `${process.env.SITE_URL}/login`
  }

  if (hasWindow && !localStorage.getItem('isLogged')) {
    logout()
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <AppContext.Provider
      value={{
        handleOpenSnackbar,
        logout
      }}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <StyledRoot>
            <SnackbarAlert open={open} snackbarType={snackbarType} handleCloseSnackbar={handleCloseSnackbar} message={message} />
            <Header handleOpenCloseSidebar={handleOpenCloseSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} handleOpenCloseSidebar={() => setOpen(false)}/>
            <Main sx={{px: 3}}>
              {children}
            </Main>
          </StyledRoot>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppContext.Provider>
  )
}

const useApp = (): AppContextInterface => {
  const context = useContext(AppContext)

  if (!context)
    throw new Error(
      'useAddToCartButton must be used within a AddToCartButtonProvider'
    )

  return context
}

export { useApp, ColorModeContext, BaseLayout }
