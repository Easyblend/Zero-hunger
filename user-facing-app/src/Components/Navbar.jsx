import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-absolute w-100 start-0 px-3">
      <div className="container-fluid">
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
          <ul className="navbar-nav mx-auto gap-4">
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
              <a className="nav-link    ">Send</a>
            </li>
          </ul>

          <div className="gap-3 d-flex ">
            <img
              src="https://img.icons8.com/?size=512&id=30840&format=png"
              width="30px"
              height="30px"
              className="rounded-5 shadow-sm border"
            />

            <i class="fa-regular fa-bell fs-4 my-auto "></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
