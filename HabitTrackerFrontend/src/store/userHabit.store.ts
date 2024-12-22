import { create } from "zustand";
import { persist } from "zustand/middleware";

type Habit = {
  id: string;
  title: string;
  frequency: string;
  status: string;
  userId: number;
  progress: string[];
  createdAt: string;
};

type HabitState = {
  habits: Habit[];
};

type HabitAction = {
  createHabit: (habit: Habit) => void;
  editHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  completeHabit: (habitId: string) => void;
  setHabits: (habits: Habit[]) => void;
  addHabit : (habits : Habit) =>void
  clearHabits : () => void;
};

const useHabitStore = create<HabitState & HabitAction>()(
  persist(
    (set) => ({
      habits: [],
      addHabit : (habit :Habit) => set((state) => ({ habits: [...state.habits, habit] })),
      createHabit: (habit: Habit) =>
        set((state) => ({ habits: [...state.habits, habit] })),
      editHabit: (updatedHabit: Habit) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === updatedHabit.id ? updatedHabit : habit
          ),
        })),
      deleteHabit: (habitId: string) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== habitId),
        })),
      completeHabit: (habitId: string) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId ? { ...habit, status: "Completed" } : habit
          ),
        })),
      setHabits: (habits: Habit[]) => set(() => ({ habits })),
      clearHabits : ()  => set(() => ({habits : []}))
    }),
    {
      name: "habitData",
    }
  )
);

export default useHabitStore;