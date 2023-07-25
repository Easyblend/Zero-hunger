import React from "react";

const ItemList = ({ pic, name }) => {
  return (
    <div
      className="rounded-3 mx-auto align-items-center d-flex justify-content-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "saturation",
        backgroundImage: `url(${pic})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "250px",
        width: "auto",
      }}
    >
      <h3 className="text-light text-center  ">{name}</h3>
    </div>
  );
};

export default ItemList;
