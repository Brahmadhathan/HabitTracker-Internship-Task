import { useGetAllHabits } from "@/hooks/useGetAllHabits";
import UserHabits from "./UserHabits";
import useHabitStore from "@/store/userHabit.store";

function UserHome() {
 useGetAllHabits();
  const userHabitss = useHabitStore((state) => state.habits);

  return (
    <div className="mt-5 container w-full p-3 md:p-0 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userHabitss && userHabitss.length > 0 ? (
          userHabitss.map((habit) => {
            return (
              <div key={habit.id}>
                <UserHabits habits={habit} />
              </div>
            );
          })
        ) : (
          <p>No habits found</p>
        )}
      </div>
    </div>
  );
}

export default UserHome;
