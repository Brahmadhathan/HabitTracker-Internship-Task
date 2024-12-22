import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { userHabit } from "@/types/habits";
import { apiUrl } from "@/constants/api";
import axios from "axios";
import useHabitStore from "@/store/userHabit.store";

interface EditUserHabitProps {
  habit: userHabit;
  show: boolean;
  setShow: (show: boolean) => void;
  setEditHabit: (habit: userHabit) => void;
}
function EditUserHabits({
  habit,
  show,
  setShow,
  setEditHabit,
}: EditUserHabitProps) {
  const editHabit = useHabitStore((state) => state.editHabit);
  const handleSubmit = async () => {
    try {
      console.log(habit);
      const res = await axios.put(
        `${apiUrl}/habit/editHabit/${habit.id}`,
        habit,
        { withCredentials: true }
      );
      const data = res.data;
      if (data.status) {
        setShow(false);
        editHabit(data.data);
      }
    } catch (error) {
      setShow(false);
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-[90vw] max-w-[425px] sm:w-full">
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
            <DialogDescription>
              Create a new habit to track. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={habit.title}
                placeholder="Enter habit name"
                className="col-span-3"
                onChange={(e) =>
                  setEditHabit({ ...habit, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select
                value={habit.frequency}
                onValueChange={(value) =>
                  setEditHabit({ ...habit, frequency: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Status
              </Label>
              <Select
                value={habit.status}
                onValueChange={(value) =>
                  setEditHabit({ ...habit, status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Update Habit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditUserHabits;
