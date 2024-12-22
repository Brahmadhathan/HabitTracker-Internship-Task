import { apiUrl } from "@/constants/api";
import useUserStore from "@/store/user.store";
import { user } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

function useGetUserProfile() {
  const [user, setUser] = useState<user>({
    name: "",
    email: "",
  });
  const userId = useUserStore((state) => state.id);
  useEffect(() => {
    async function fetchUser() {
        const res = await axios.get(`${apiUrl}/user/getDetails/${userId}`, {withCredentials: true});
        setUser(res.data.data);
    }
    fetchUser()
  }, [])
  return user
}

export default useGetUserProfile;
