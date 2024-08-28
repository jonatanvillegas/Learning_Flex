import { ReactNode } from "react";
import { IconType } from "react-icons";

type SidebarItem = {
  id: number;
  nombre: string;
  icon: IconType; 
  path: string;
};
type ItemCreate = Omit<SidebarItem,"path">

type ItemCategory = Omit<ItemCreate,'path' | 'icon'> 
& {icon:string,prompt:string}


export type{ SidebarItem, ItemCreate,ItemCategory};
