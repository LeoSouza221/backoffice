import { useEffect } from 'react'
import { Box, Drawer } from '@mui/material'
import Image from 'next/image'
import NavSection from './nav-section'

const NAV_WIDTH = 280


interface ISidebarProps {
  handleOpenCloseSidebar: () => void
  isSidebarOpen: boolean
}

export default function Navbar({ isSidebarOpen, handleOpenCloseSidebar }: ISidebarProps) {
  useEffect(() => {
    if (isSidebarOpen) {
      handleOpenCloseSidebar()
    }
  }, [])

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            backgroundColor: 'background.paper',
            display: ['none', 'none', 'block'],
            borderRadius: '0 10px 10px 0'
          },
        }}
      >
        <Box
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <Image
              width={180}
              height={63}
              alt="Tipminer Logo"
              src="/assets/logo.png"
            />
          </Box>

          <NavSection />
        </Box>
      </Drawer>

      <Drawer
        open={isSidebarOpen}
        onClose={handleOpenCloseSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { width: NAV_WIDTH },
        }}
        sx={{ display: ['block', 'block', 'none'] }}
      >
        <Box
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <Image
              width={180}
              height={63}
              alt="Tipminer Logo"
              src="/assets/logo.png"
            />
          </Box>

          <NavSection />
        </Box>
      </Drawer>
    </Box>
  )
}
