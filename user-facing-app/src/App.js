import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import RequestPage from "./Pages/RequestPage";
import Send from "./Pages/Send";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";
import useUserHook from "./Utils/useUserHook";
import { useEffect } from "react";
import ItemDetail from "./Pages/ItemDetail";

function App() {
  const route = useLocation();
  const navigate = useNavigate();
  const { user } = useUserHook();

  useEffect(() => {
    if (user) return navigate("/home");
  }, []);

  return (
    <>
      {route.pathname == "/" ||
        (route.pathname == "/signup" ? null : <Navbar />)}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/send" element={<Send />} />
        <Route path="/detail/:item" element={<ItemDetail />} />
      </Routes>
    </>
  );
}

export default App;
