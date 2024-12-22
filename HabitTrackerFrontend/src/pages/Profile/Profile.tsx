import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { apiUrl } from "@/constants/api";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import useUserStore from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import useHabitStore from "@/store/userHabit.store";

function Profile() {
  const id = useUserStore((state) => state.id);
  const user = useGetUserProfile();
  const signOut = useUserStore((state) => state.deleteUser);
  const navigate = useNavigate();
  const clearHabits = useHabitStore((state) => state.clearHabits);

  const [form, setForm] = useState({
    name: "",
  });
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setForm({ ...form, name: user.name });
    setEmail(user.email);
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`${apiUrl}/user/updateDetails/${id}`, form, {
        withCredentials: true,
      });

      if (res.data.status) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleSignOut = async() => {
    const res = await axios.delete(`${apiUrl}/user/signout`, {withCredentials: true});
    if (res.data.status) {
      signOut();
      clearHabits()
      navigate("/");
    }
  

  };

  return (
    <div className="pt-24 bg-gray-100 w-full h-screen">
      <div className="container mx-auto flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <Input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              readOnly
              className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <Button onClick={handleUpdateProfile} className="w-full bg-indigo-600 text-white mb-4">
            Update Profile
          </Button>
          <Button onClick={handleSignOut} className="w-full bg-red-600 text-white">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;