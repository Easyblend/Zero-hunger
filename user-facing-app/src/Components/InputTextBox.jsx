import React from "react";

export default InputTextBox = ({ type, placeholder }) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        className="form-control py-3"
        placeholder={placeholder}
      />
    </div>
  );
};
