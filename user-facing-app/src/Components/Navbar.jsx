import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

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
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-absolute w-100 start-0 px-0 px-sm-5 ">
      <div className="container-fluid px-sm-5 mx-sm-5">
        <a className="navbar-brand fs-4">
          <span className="fw-bold text-primary">Zero</span> Hunger
        </a>
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Request
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Send</a>
            </li>
          </ul>

          <div className="gap-3 d-flex justify-content-between">
            <div>
              <li className="nav-item dropdown navbar-nav ms-auto">
                <img
                  src={profilePic}
                  width="30px"
                  height="30px"
                  className="rounded-5 shadow-sm border dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Activities
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li onClick={() => signOut(auth)}>
                    <a class="dropdown-item" href="#">
                      Log out
                    </a>
                  </li>
                </ul>
              </li>
            </div>

            <i class="fa-regular fa-bell fs-4 my-auto "></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
