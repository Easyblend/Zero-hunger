import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
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

  const gmailLogin = (e) => {
    e.preventDefault();
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

  const forgetPass = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (error) {
      setError(error.code);
    }
  };
  return (
    <div className="container">
      <div className="row text-center vh-100 mx-auto align-items-center">
        <a href="/" className="navbar-brand fs-4 text-start">
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
          {error && <p className="text-danger fw-bold py-2">{error.split("/")[1]}</p>}
          {isLoad ? (
            <button className="btn btn-primary py-3 w-100 mb-3" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              loading
            </button>
          ) : (
            <div className="mb-3">
              <input
                type="submit"
                className="btn w-100 py-3 btn-primary"
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

            <p role="button" onClick={forgetPass}>
              Forgot Password?
            </p>
          </div>
          <h3 className="text-muted mt-3">Or </h3>
          <p className="mt-3">Login with </p>
          <button
            className="gap-1 d-flex btn btn-dark justify-content-center fs-5 border border-1 w-50 py-2 shadow-sm rounded-2  mx-auto align-items-center"
            onClick={gmailLogin}
          >
            <img
              src="https://img.icons8.com/?size=512&id=17949&format=png"
              alt="google"
              height="30px"
              width="30px"
            />
            <p className="my-auto">Google</p>
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
