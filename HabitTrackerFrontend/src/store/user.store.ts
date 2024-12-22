import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
  id: string;
};

type UserActions = {
  setUser: (id: string) => void;
  deleteUser: () => void;
};

const useUserStore = create<User & UserActions>()(
  persist((set) => ({
    id: "",
    setUser: (id: string) => set(() => ({ id })),
    deleteUser: () => set(() => ({ id: "" })),
  }),{
    name : 'userData',
  }
)
);
export default useUserStore;