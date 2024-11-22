
import { create } from "zustand";

interface ModalActivo {
  modalActivo: boolean ;
  setModalActivo:  (valor: boolean) => void;
}

export const useModal = create<ModalActivo>((set) => ({
    modalActivo: false, 
    setModalActivo: ( valor) => set({modalActivo:valor}),
}));