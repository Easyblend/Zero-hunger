import React from "react";

const ItemList = ({ pic, name }) => {
  return (
    <div
      className="rounded-0 align-items-center d-flex justify-content-center mx-auto mb-2"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        backgroundBlendMode: "saturation",
        backgroundImage: `url(${pic})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        width: "100%",
        height: "12rem",
      }}
    >
      <h5 className="text-light text-center">{name}</h5>
    </div>
  );
};

export default ItemList;
