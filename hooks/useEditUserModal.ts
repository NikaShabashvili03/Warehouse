import { SafeUser } from '@/types';
import { create } from 'zustand';

interface EditUseModal {
  isOpen: boolean;
  data: SafeUser | undefined,
  setData: (user: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useEditUserModal = create<EditUseModal>((set) => ({
  isOpen: false,
  data: undefined,
  setData: (user) => set({data: user}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useEditUserModal;
