import { Icon } from '@iconify/react'

import { SideNavItem } from './types'

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="mingcute:home-3-line" width="24" height="24" />,
  },
  {
    title: 'My groups',
    path: '/groups',
    icon: <Icon icon="mingcute:group-3-line" width="24" height="24" />,
  },
]
