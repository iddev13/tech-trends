import { INavItem } from "@/types/header";


export const menuItems: Array<INavItem> = [
  {
    id: 1, path: '/', name: 'home',
  },
  {
    id: 2, path: '/pages',
    name: 'pages',
    subMenu: [
      {
        id: 1, path: '/pages/home1',
        name: 'home page 1',
      },
      {
        id: 2, path: '/pages/home2',
        name: 'home page 2',
      },
      {
        id: 3, path: '/pages/home3',
        name: 'home page 3',
      },
    ]
  },
  {
    id: 3, path: '/about', name: 'about'
  },
  {
    id: 4, path: '/contacts', name: 'contact us'
  },
];
