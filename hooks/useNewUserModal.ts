import { create } from 'zustand';

interface NewUserModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNewUserModal = create<NewUserModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useNewUserModal;
