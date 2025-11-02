interface Pages1{
  [key: string]: string;
}

enum Pages {
  HOME = 'Home',
  DASHBOARD = 'Dashboard',
  SETTINGS = 'Settings',
  PROFILE = 'Profile',
  ADMIN_PANEL = 'Admin Panel'
}

interface Roles {
  [key: string]: string;
}

type PagePermissions = {
  visualElements: string[]
  interactions: string[]
  defaultViewState: string
}

type PagePermissions2 = {
  visualElements: { [key: string]: string[] }
  interactions: { [key: string]: string[] }
  defaultViewState: { [key: string]: string }
}

const pages: Pages1 = {
  home: 'Home',
  dashboard: 'Dashboard',
  settings: 'Settings',
  profile: 'Profile',
  adminPanel: 'Admin Panel'
}

const roles: Roles = {
  admin: 'admin',
  user: 'user',
  guest: 'guest'
}

export interface Permissions {
  'visual_elements': string[]
  'interactions': string[]
  'default_view_state': string
}

export interface RoleEntry {
  permissions: Permissions
}

export interface RbacRules {
  page: string
  roles: Record<string, RoleEntry>
}

const userPagePermissions: RbacRules = {
  page: 'home',
  roles: {
    user: {
      permissions: {
        'visual_elements': ['header', 'footer', 'mainContent'],
        'interactions': ['click', 'scroll'],
        'default_view_state': 'expanded'
      }
    },
    admin: {
      permissions: {
        'visual_elements': ['header', 'footer', 'mainContent', 'adminPanel'],
        'interactions': ['click', 'scroll', 'drag', 'drop'],
        'default_view_state': 'expanded'
      }
    }
  }
}
  
export type PagesKey = keyof typeof pages

export type PagesPermissionsMap = {
  [key in PagesKey]: PagePermissions
}

const adminPagePermissions: PagesPermissionsMap = {
  home: {
    visualElements: ['header', 'footer', 'mainContent'],
    interactions: ['click', 'scroll'],
    defaultViewState: 'expanded'
  },
  dashboard: {
    visualElements: ['charts', 'tables', 'filters'],
    interactions: ['click', 'drag', 'drop'],
    defaultViewState: 'collapsed'
  },
  settings: {
    visualElements: ['form', 'buttons', 'toggles'],
    interactions: ['click', 'input'],
    defaultViewState: 'expanded'
  },
  profile: {
    visualElements: ['avatar', 'bio', 'posts'],
    interactions: ['click', 'scroll'],
    defaultViewState: 'expanded'
  },
  adminPanel: {
    visualElements: ['userManagement', 'settings', 'logs'],
    interactions: ['click', 'input'],
    defaultViewState: 'expanded'
  }
}

const userPagePermissions2: PagesPermissionsMap = {
  home: {
    visualElements: ['header', 'footer', 'mainContent'],
    interactions: ['click', 'scroll'],
    defaultViewState: 'expanded'
  },
  dashboard: {
    visualElements: ['charts', 'tables'],
    interactions: ['click', 'drag'],
    defaultViewState: 'collapsed'
  },
  settings: {
    visualElements: ['form', 'buttons'],
    interactions: ['click', 'input'],
    defaultViewState: 'expanded'
  },
  profile: {
    visualElements: ['avatar', 'bio'],
    interactions: ['click', 'scroll'],
    defaultViewState: 'expanded'
  },
  adminPanel: {
    visualElements: [],
    interactions: [],
    defaultViewState: 'expanded'
  } 
}

export { pages, roles, adminPagePermissions, userPagePermissions }

