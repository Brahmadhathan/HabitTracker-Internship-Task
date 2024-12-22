import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Hompage/Homepage";
import Signup from "./pages/SignUp/Signup";
import Signin from "./pages/Signin/Signin";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/User/Home";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import useUserStore from "./store/user.store";

function App() {
  const user = useUserStore((state) => state.id);

  return (
    <>
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/userhome" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={user ? <Navigate to="/userhome" /> : <Signin />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/userhome" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;