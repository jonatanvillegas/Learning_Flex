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

type Capitulo = {
  nombre: string;
  descripcion: string;
  duracion: string;
};

type Curso = {
  titulo: string;
  nombre: string;
  Image: string;
  descripcion: string;
  duracion: string;
  categoria: string;
  numCapitulos: number;
  Dificultad: string;
  capitulos: Capitulo[];
  userId: string 
};


export type{ SidebarItem, ItemCreate,ItemCategory,Curso};
