import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import RequestPage from "./Pages/RequestPage";
import Send from "./Pages/Send";

import Navbar from "./Components/Navbar";
import useUserHook from "./Utils/useUserHook";
import { useEffect } from "react";
import ItemDetail from "./Pages/ItemDetail";
import Profile from "./Pages/Profile";

function App() {
  const route = useLocation();
  const navigate = useNavigate();
  const { user } = useUserHook();

  useEffect(() => {
    if (user) {
      return navigate("/home");
    } else {
      return navigate("/");
    }
  }, []);

  return (
    <>
      {route.pathname == "/" ||
        (route.pathname == "/signup" ? null : <Navbar />)}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/request" element={<RequestPage />} />
        <Route path="/send" element={<Send />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/detail/:item" element={<ItemDetail />} />
      </Routes>
    </>
  );
}

export default App;
