import React, { useState } from "react";
import useUserHook from "../Utils/useUserHook";

const Profile = ({ user }) => {
  // Set default values for pic and newName in case user is undefined or null
  const [pic, setPic] = useState(user?.photoURL);
  const [newName, setName] = useState(user?.displayName);
  const [newEmail, setEmail] = useState(user?.email);
  const [newPassword, setPassword] = useState("**********");

  const [edit, setEdit] = useState(true);

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

        <form className="col-10 col-sm-6">
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
        </form>
      </div>
    </div>
  );
};

export default Profile;
