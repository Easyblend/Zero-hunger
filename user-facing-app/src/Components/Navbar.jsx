import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
        setProfilePic(user.photoURL);
      } else {
        return navigate("/");
      }
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary  w-100 start-0 px-0 px-sm-5 ">
      <div className="container-fluid px-sm-5 mx-sm-5">
        <Link to="/home" className="navbar-brand fs-4">
          <span className="fw-bold text-primary">Zero</span> Hunger
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center gap-4">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/request" className="nav-link" href="#">
                Request
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/send" className="nav-link">
                Donate
              </Link>
            </li>
          </ul>

          <div className="gap-3 d-flex justify-content-between">
            <div role="button">
              <li className="nav-item dropdown navbar-nav ms-auto">
                <img
                  src={profilePic}
                  width="40px"
                  height="40px"
                  className="rounded-5 shadow-sm border dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="dropdown-item" href="#">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li role="button" onClick={() => signOut(auth)}>
                    <a className="dropdown-item">Log out</a>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
