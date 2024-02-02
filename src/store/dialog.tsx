import { create } from "zustand";

type DialogState = {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
};

const useDialog = create<DialogState>((set) => ({
  open: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
}));

export default useDialog;
