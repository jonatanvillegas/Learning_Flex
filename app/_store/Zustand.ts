
import { create } from "zustand";

interface UserInputState {
  userCourseInput: { [key: string]: string };
  setUserCourseInput: (propiedad: string, valor: string) => void;
}

export const useUserInput = create<UserInputState>((set) => ({
  userCourseInput: {}, // Estado inicial como array vacío
  setUserCourseInput: (propiedad, valor) =>
    set((state) => ({
      userCourseInput: {
        ...state.userCourseInput, // Mantén las propiedades existentes
        [propiedad]: valor, // Agrega o actualiza la propiedad con el nuevo valor
      },
    }))
}));