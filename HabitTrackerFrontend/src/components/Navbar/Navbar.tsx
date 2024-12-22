import {  Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddHabit from "./AddHabit";
import { useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate()
  return (
    <div className="fixed bg-white border-b border-gray-100 w-full p-5 ">
      <div className="container mx-auto  flex justify-between items-center">
        <div className="flex items-center gap-4 hover:cursor-pointer" onClick={() => navigate('/userhome')} >
          <Target className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-800">Atomic Tracker</h3>
        </div>
        <div>
          <ul className="flex items-center gap-4 ">
            <li>
             <AddHabit />
            </li>
            <li>
              <Button  onClick = { () => navigate('/profile')}className="p-3 bg-white text-balck hover:bg-gray-50"> Profile</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
