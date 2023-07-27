import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const [isLoad, setLoading] = useState(false);

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

  const register = (e) => {
    e.preventDefault();

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            auth.currentUser.photoURL ||
            "https://1fid.com/wp-content/uploads/2022/06/Twitter-profile-picture-4-1024x1024.jpg",
        });
        setLoading(false);
        return navigate("/home");
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row text-center vh-100 mx-auto align-items-center">
        <a className="navbar-brand fs-4 text-start">
          <span className="fw-bold text-primary">Zero</span> Hunger
        </a>
        <form className="col-12 col-sm-6 mx-auto shadow-lg  p-5">
          <h2>Create an Account</h2>

          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-control py-3"
              placeholder="Full Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
                className="fa-regular fa-eye text-primary position-absolute top-50 end-0 translate-middle-y pe-3"
                role="button"
                onClick={() => setHidePassword(!hidePassword)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye-slash  position-absolute top-50 end-0 translate-middle-y pe-3"
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
                onClick={register}
              />
            </div>
          )}

          <div className="justify-content-between d-flex">
            <p
              className="text-mute"
              role="button"
              onClick={() => navigate("/")}
            >
              Already have an account{" "}
              <span className="fw-bold  text-danger">login</span>
            </p>
          </div>
          <h3 className="text-muted mt-3">Or </h3>
          <p className="mt-3">Sign Up with </p>
          <button
            className="gap-1 d-flex btn btn-dark justify-content-center fs-5 border border-1 w-50 py-2 shadow-sm rounded-2  mx-auto align-items-center"
            onClick={gmailLogin}
            role="button"
          >
            <img
              src="https://img.icons8.com/?size=512&id=17949&format=png"
              alt="google"
              height="30px"
              width="30px"
            />
            <p className="my-auto">Google</p>
          </button>
          <p className="text-danger fw-bold pt-5">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
