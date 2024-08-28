import { ItemCreate, SidebarItem } from "@/types";
import { HiLightBulb } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { IoOptions } from "react-icons/io5";

 export const ItemsCreate:ItemCreate[] = [
    {
      id: 1,
      nombre: 'Categoria',
      icon: MdCategory,
    },
    {
      id: 2,
      nombre: 'Tema y Desc',
      icon: HiLightBulb,
    },
    {
      id: 3,
      nombre: 'Opciones',
      icon: IoOptions,
    },
  ]