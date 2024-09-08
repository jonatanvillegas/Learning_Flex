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
  numCapitulos: string;
  Dificultad: string;
  capitulos: Capitulo[];
};
type CourseIA = {
  idCourse: string;
  userId: string;
  nombre: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  duracion: string;
  dificultad: string;
  numCapitulos: number;
  capitulos: Capitulo[];
}

type coursePrueba = {
  course: Curso
  idCourse:string
  userId:string
}



export type{ SidebarItem, ItemCreate,ItemCategory,Curso,CourseIA,coursePrueba,Capitulo};
