import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, List, ListItemText } from '@mui/material'
import { ListItemButton } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import CallIcon from '@mui/icons-material/Call'
import Announcement from '@mui/icons-material/Announcement'
import CampaignIcon from '@mui/icons-material/Campaign'
import BarChartIcon from '@mui/icons-material/BarChart'
import { usePathname  } from 'next/navigation'

const navConfig = [
  {
    title: 'Contatos',
    path: '/contacts',
    icon: <CallIcon />
  },
  {
    title: 'Usuários',
    path: '/users',
    icon: <PersonIcon />
  },
  {
    title: 'Sugestões',
    path: '/suggestions',
    icon: <Announcement />
  },
  {
    title: 'Reclamações',
    path: '/complaint',
    icon: <CampaignIcon />
  },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <BarChartIcon />
  }
]

let didInit = false;

export default function NavSection() {
  const [ selectedIndex, setSelectedItem ] = useState(0)
  const pathname = usePathname()

  // ✅ Only runs once per app load
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      handleCurrentRoute()
    }
  }, [])

  const handleListItemClick = (index: number) => {
    setSelectedItem(index)
  }

  const handleCurrentRoute = () => {
    const itemPosition = navConfig.findIndex((nav) => nav.path === pathname)

    if (itemPosition) {
      handleListItemClick(itemPosition)
    }
  }

  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item, index) => (
          <ListItemButton
            key={item.title}
            selected={selectedIndex === index}
            component={Link}
            href={item.path}
            onClick={() => handleListItemClick(index)}
            sx={{
              '&.active': {
                color: 'text.primary',
                backdropColor: 'action.selected',
                fontWeight: 'fontWeightBold',
              },
              height: 48,
              position: 'relative',
              textTransform: 'capitalize',
              color: 'text.secondary',
              borderRadius: '4px',
            }}
          >
            {item.icon}
            <ListItemText disableTypography primary={item.title} sx={{ ml: 2 }} />

          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}