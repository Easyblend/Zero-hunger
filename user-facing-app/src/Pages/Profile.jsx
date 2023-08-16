import React, { useState } from "react";

import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Profile = ({ user }) => {
  // Set default values for pic and newName in case user is undefined or null
  const [pic, setPic] = useState(user?.photoURL);
  const [newName, setName] = useState(user?.displayName);
  const [newEmail, setEmail] = useState(user?.email);
  const [newPassword, setPassword] = useState("**********");

  const [edit, setEdit] = useState(true);

  const [load, setLoad] = useState(false);

  const [errorCode, setErrorCode] = useState(null);

  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      if (newName || pic) {
        await updateProfile(auth.currentUser, {
          displayName: newName || user.displayName,
          photoURL: pic || user.displayName,
        });
      }

      if (newEmail) {
        await updateEmail(auth.currentUser, newEmail);
      }

      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }
      setLoad(false);
      setEdit(!edit);
    } catch (err) {
      setLoad(false);
      setErrorCode(err.code);
      setEdit(!edit);
    }
  };

  return (
    <div className="container">
      <div className="row mx-auto text-center justify-content-center pt-5">
        <h1>Profile Details</h1>
        <div>
          <img
            src={pic}
            alt=""
            className="rounded-5 shadow-sm  "
            width="80px"
            height="80px"
          />
        </div>

        <form className="col-10 col-sm-5">
          <div className="mt-4">
            <input
              type="text"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="form-control py-2"
              disabled={edit}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setName(e.target.value)}
              className="form-control py-2"
              disabled={edit}
            />
          </div>
          <div className="mt-3">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control py-2"
              disabled={edit}
            />
          </div>
          <div className="mt-3">
            <input
              type="passowrd"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control py-2"
              disabled={edit}
            />
          </div>
          <div className="mt-3">
            {!edit ? (
              !load ? (
                <button
                  type="submit "
                  className="btn btn-primary"
                  onClick={profileUpdate}
                >
                  Save Chanages
                </button>
              ) : (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Updating Profile...
                </button>
              )
            ) : (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(!edit);
                }}
              >
                Edit details
              </button>
            )}
          </div>
        </form>
        {errorCode ? (
          <p className="text-danger mt-3 fw-bold">{errorCode}</p>
        ) : (
          <p className="text-success mt-3 fw-bold">
            {" "}
            Profile successfully Updated
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
