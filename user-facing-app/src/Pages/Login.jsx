import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);

  const [isLoad, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const gmailLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
        return navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code);
      });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return navigate("/home");
    } catch (error) {
      setLoading(false);

      setError(error.code);
    }
  };
  return (
    <div className="container">
      <div className="row text-center vh-100 mx-auto align-items-center">
        <a className="navbar-brand fs-4 text-start">
          <span className="fw-bold text-primary ">Zero</span> Hunger
        </a>
        <form className="col-12 col-sm-6 mx-auto shadow-lg  p-5">
          <h2 className="mb-5">Log in</h2>

          <div className="mb-3">
            <input
              type="email"
              className="form-control py-3"
              placeholder="email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={(hidePassword && "text") || "password"}
              className="form-control py-3"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {hidePassword ? (
              <i
                className="fa-regular fa-eye position-absolute top-50 end-0 translate-middle-y pe-3"
                role="button"
                onClick={() => setHidePassword(!hidePassword)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye-slash position-absolute top-50 end-0 translate-middle-y pe-3"
                role="button"
                onClick={() => setHidePassword(!hidePassword)}
              ></i>
            )}
          </div>
          {isLoad ? (
            <button
              className="btn btn-primary py-3 w-100 mb-3"
              type="button"
              disabled
            >
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <div className="mb-3">
              <input
                type="submit"
                className="btn w-100 py-3 btn-primary"
                role="button"
                onClick={login}
              />
            </div>
          )}

          <div className="justify-content-between d-flex">
            <p
              className="text-mute"
              role="button"
              onClick={() => navigate("/signup")}
            >
              <span className="fw-bold  text-primary">Create Account</span>
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
              onClick={gmailLogin}
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
          <p className="text-danger fw-bold pt-5">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
