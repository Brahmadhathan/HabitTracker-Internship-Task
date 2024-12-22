import { apiUrl } from "@/constants/api";
import useHabitStore from "@/store/userHabit.store";
import { userHabit } from "@/types/habits";
import axios from "axios";
import { Edit, Trash2, CheckCircle2, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import EditUserHabits from "./EditUserHabits";

interface UserHabitProps {
  habits: userHabit;
}

function UserHabits(userHabitProps: UserHabitProps) {
  const editHabitZus = useHabitStore((state) => state.editHabit);

  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const [editHabit, setEditHabit] = useState<userHabit>(userHabitProps.habits);
  const [showEdit, setShowEdit] = useState(false);
  const [progress, setProgress] = useState(0);

  function calculateProgress(habit: userHabit) {
    const today = new Date();
    const progressDates = habit.progress.map((date) => new Date(date));

    if (habit.frequency === "Daily") {
      const isCompletedToday = progressDates.some(
        (date) => date.toDateString() === today.toDateString()
      );
      setProgress(isCompletedToday ? 100 : 0);
    } else if (habit.frequency === "Weekly") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(today.getDate() - today.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const completedThisWeek = progressDates.filter(
        (date) => date >= startOfWeek && date <= endOfWeek
      ).length;

      const progressPercentage = Math.ceil((completedThisWeek / 7) * 100);
      setProgress(Math.min(progressPercentage, 100));
    } else if (habit.frequency === "Monthly") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const completedThisMonth = progressDates.filter(
        (date) => date >= startOfMonth && date <= endOfMonth
      ).length;
      setProgress(Math.ceil((completedThisMonth / endOfMonth.getDate()) * 100));
    }
  }

  console.log(progress);

  useEffect(() => {
    calculateProgress(userHabitProps.habits);
  }, [userHabitProps.habits]);

  async function onDelete(id: string) {
    const res = await axios.delete(`${apiUrl}/habit/deleteHabit/${id}`, {
      withCredentials: true,
    });
    const data = res.data;
    if (data.status) {
      deleteHabit(id);
    }
  }

  function onEdit(habit: userHabit) {
    setEditHabit(habit);
    setShowEdit(true);
  }

  async function onComplete(id: string) {
    const updatedHabit = {
      ...userHabitProps.habits,
      progress: [...userHabitProps.habits.progress, new Date().toISOString()],
    };
    const res = await axios.put(
      `${apiUrl}/habit/editHabit/${id}`,
      updatedHabit,
      {
        withCredentials: true,
      }
    );
    const data = res.data;
    if (data.status) {
      editHabitZus(data.data);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <EditUserHabits
        habit={editHabit}
        show={showEdit}
        setShow={setShowEdit}
        setEditHabit={setEditHabit}
      />
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {userHabitProps.habits.title}
          </h3>
          <p className="text-sm text-gray-500 capitalize">
            {userHabitProps.habits.frequency}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(userHabitProps.habits)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(userHabitProps.habits.id)}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">{progress}% Complete</p>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            userHabitProps.habits.status === "Active"
              ? "bg-green-100 text-green-800"
              : userHabitProps.habits.status === "Inactive"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {userHabitProps.habits.status}
        </span>

        <button
          onClick={() => onComplete(userHabitProps.habits.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {userHabitProps.habits.progress.some(
            (date) =>
              new Date(date).toDateString() === new Date().toDateString()
          ) ? (
            <CheckCircle2 className="text-green-500" size={20} />
          ) : (
            <Circle className="text-gray-400" size={20} />
          )}
          <span className="text-sm font-medium">
            {userHabitProps.habits.progress.some(
              (date) =>
                new Date(date).toDateString() === new Date().toDateString()
            )
              ? "Completed"
              : "Mark Complete"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default UserHabits;
