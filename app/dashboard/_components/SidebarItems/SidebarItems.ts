import { SidebarItem } from '@/types';
import { FaBookmark, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';

const sidebarItems:SidebarItem[] = [
  {
    id: 1,
    nombre: 'Home',
    icon: FaHome,
    path: '/dashboard',
  },
  {
    id: 2,
    nombre: 'Foro',
    icon: FaUser,
    path: '/dashboard/foro',
  },
  {
    id: 3,
    nombre: 'Guardado',
    icon: FaBookmark ,
    path: '/dashboard/guardado',
  },
  {
    id: 4,
    nombre: 'Deslogueo',
    icon: FaSignOutAlt,
    path: '/logout',
  },
];

export default sidebarItems;
