'use client'
import { CourseIA, coursePrueba } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";  // Importar middleware de persistencia

interface CourseInterface {
  Course: Partial<coursePrueba>;
  setCourse: (course: CourseIA) => void;
}

export const useCourse = create(
  persist<CourseInterface>(
    (set) => ({
      Course: {},
      setCourse: (course) =>
        set((state) => ({
          Course: { ...course },
        })),
    }),
    {
      name: 'course-storage', // El nombre de la clave en localStorage
      getStorage: () => localStorage, // Definir que quieres usar localStorage
    }
  )
);
