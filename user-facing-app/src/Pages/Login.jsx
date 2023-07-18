import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row text-center vh-100 mx-auto align-items-center">
        <form className="col-12 col-sm-6 mx-auto shadow-lg  p-5">
          <h2 className="mb-5">Log in</h2>

          <div className="mb-3">
            <input
              type="email"
              className="form-control py-3"
              placeholder="email..."
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={(hidePassword && "text") || "password"}
              className="form-control py-3"
              placeholder="Password..."
            />
            {hidePassword ? (
              <i
                class="fa-regular fa-eye position-absolute top-50 end-0 translate-middle-y pe-3"
                role="button"
                onClick={() => setHidePassword(!hidePassword)}
              ></i>
            ) : (
              <i
                class="fa-regular fa-eye-slash position-absolute top-50 end-0 translate-middle-y pe-3"
                role="button"
                onClick={() => setHidePassword(!hidePassword)}
              ></i>
            )}
          </div>
          <div className="mb-3">
            <input
              type="submit"
              className="btn w-100 py-3 btn-primary"
              role="button"
            />
          </div>
          <div className="justify-content-between d-flex">
            <p
              className="text-mute"
              role="button"
              onClick={() => navigate("/signup")}
            >
              Don't have an Account{" "}
              <span className="fw-bold  text-danger">Register</span>
            </p>
            <p role="button">Forgot Password?</p>
          </div>
          <h3 className="text-muted mt-3">Or </h3>
          <p className="mt-3">Login with </p>
          <div className="gap-3 d-flex justify-content-center fs-3">
            <img
              src="https://img.icons8.com/?size=512&id=17949&format=png"
              alt="google"
              height="50px"
              width="50px"
              className="border border-1 shadow-sm rounded-2 p-1"
              role="button"
            />
            <img
              src="https://img.icons8.com/?size=512&id=114441&format=png"
              height="50px"
              width="50px"
              alt="facebook"
              className="border border-1 shadow-sm rounded-2 p-1"
              role="button"
            />
            <img
              src="https://img.icons8.com/?size=512&id=30840&format=png"
              height="50px"
              width="50px"
              alt="apple"
              className="border border-1 shadow-sm rounded-2 p-1"
              role="button"
              icon-link-hover
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
