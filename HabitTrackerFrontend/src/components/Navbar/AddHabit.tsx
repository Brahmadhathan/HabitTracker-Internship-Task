import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import useUserStore from "@/store/user.store";
import { apiUrl } from "@/constants/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useHabitStore from "@/store/userHabit.store";
function AddHabit() {
  const userId = useUserStore((state) => state.id);
  const addHabit = useHabitStore((state) => state.addHabit);
  const [form, setForm] = useState({
    title: "",
    frequency: "",
    status: "Active",
    userId: userId,
  });
  const [open, setOpen] = useState(false);
  async function handleSubmit() {
    try {
      const res = await axios.post(`${apiUrl}/habit/createHabit`, form, {
        withCredentials: true,
      });
      const data = res.data;
      addHabit(data.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Habit
        </Button>
      </DialogTrigger>
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
              value={form.title}
              placeholder="Enter habit name"
              className="col-span-3"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="frequency" className="text-right">
              Frequency
            </Label>
            <Select
              value={form.frequency}
              onValueChange={(value) => setForm({ ...form, frequency: value })}
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
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Habit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddHabit;
