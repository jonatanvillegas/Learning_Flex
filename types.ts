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
  videoId?: string
};

type Curso = {
  titulo: string;
  nombre: string;
  Image: string;
  descripcion: string;
  duracion: string;
  categoria: string;
  numeroCapitulos: string;
  dificultad: string;
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

//types Video

// types.ts

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
};

export type VideoId = {
  kind: 'youtube#video';
  videoId: string;
};

export type VideoSnippet = {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  title: string;
};

export type Video = {
  etag: string;
  id: VideoId;
  kind: 'youtube#searchResult';
  snippet: VideoSnippet;
};

export type YouTubeResponse = {
  items: Video[];
};

type Price = {
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: number | null;
  id: string;
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, unknown>;
  nickname: string | null;
  object: string;
  product: string;
  recurring: {
      aggregate_usage: string | null;
      interval: 'day' | 'week' | 'month' | 'year';
      interval_count: number;
      meter: string | null;
      trial_period_days: number | null;
      usage_type: string;
  } | null;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: unknown | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};
type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  creditos: number;
  premium: boolean;
  clerkUserId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type{ SidebarItem, ItemCreate,ItemCategory,Curso,CourseIA,coursePrueba,Capitulo,Price,User};
