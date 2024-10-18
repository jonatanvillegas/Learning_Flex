  'use client'
  import { coursePrueba, Curso } from "@/types";
  import { create } from "zustand";
  import { persist } from "zustand/middleware";  // Importar middleware de persistencia

  // types.ts
  export interface Chapter {
      id: number;
      courseId: number;
      name: string;
      description: string;
      duration: string;
      videoId: string;
    }
    
    export interface CourseIA {
      id: number;
      name: string;
      image: string;
      category: string;
      level: string;
      duration: string;
      numCapitulos: string;
      userId: string;
      createdAt: string; // Es mejor usar string para fechas si se va a guardar en localStorage
      Chapters: Chapter[];
    }
    

  interface CourseInterface {
    Course: Partial<CourseIA>;
    setCourse: (course: CourseIA) => void;
  }

  export const useViewCurso = create(
      persist<CourseInterface>(
          (set) => ({
            Course: {},  // Inicializamos vacío, como Partial
            setCourse: (course) => set((state) => ({
              Course: { ...state.Course, ...course },  // Actualizamos el curso con los datos recibidos
            })),
          }),
          {
            name: 'course-storage',
            getStorage: () => localStorage,
          }
        )
      
  );
