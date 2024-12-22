import { apiUrl } from "@/constants/api";
import useUserStore from "@/store/user.store";
import useHabitStore from "@/store/userHabit.store";
import { userHabit } from "@/types/habits";
import axios from "axios";
import { useEffect, useState } from "react";

export function useGetAllHabits() {
  const [userHabits, setUserHabits] = useState<userHabit[]>([]);
  const userId = useUserStore((state) => state.id);
  const setHabits = useHabitStore((state) => state.setHabits);
  async function fetchHabits() {
    try {
      const res = await axios.get(`${apiUrl}/habit/${userId}`, {
        withCredentials: true,
      });
      setUserHabits(res.data.data); 
      setHabits(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHabits(); 
  }, []);


}
