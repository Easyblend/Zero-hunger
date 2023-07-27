import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ItemDetail = () => {
  const detail = useParams();
  const itemList = [
    {
      name: "Yam chips",
      pic: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      id: 7612,
    },
    {
      id: 1,
      name: "Yam chips",
      pic: "https://thumbs.dreamstime.com/b/valencia-spain-march-home-food-pantry-storage-provision-to-survive-coronavirus-covid-pandemic-cuarentine-canned-tuna-184921995.jpg",
    },
    {
      id: 7613,
      name: "Yam chips",
      pic: "https://images.squarespace-cdn.com/content/v1/54222358e4b0ef23d87a996b/1577802497997-D2EJBJRRCM7MD2IM1OPV/cr-nestle-golden-morn-cereal-250g.jpg",
    },
    {
      name: "Yam chips",
      pic: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      id: 76123,
    },
    {
      name: "Yam chips",
      pic: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      id: 761212,
    },
    {
      name: "Yam chips",
      pic: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      id: 7612233,
    },
    {
      name: "Yam chips",
      pic: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      id: 76122,
    },
    {
      name: "Yam chips",
      pic: "https://thumbs.dreamstime.com/z/valencia-spain-march-home-food-pantry-storage-provision-to-survive-coronavirus-covid-pandemic-cuarentine-canned-tuna-184921994.jpg",
      id: 7,
    },
  ];

  const navigate = useNavigate();

  const chooseItem = itemList.filter((item) => {
    return item.id == detail.item;
  });

  return (
    <div className="container pt-5">
      <div className="row pt-2 justify-content-between">
        <div className="col-12 col-lg-5">
          <h6 className="text-muted">Distance from FDC</h6>
          <div className="mt-5">
            <h2>{chooseItem[0].name}</h2>
            <p>
              Yam chips are not only delicious but also a delightful and
              healthier alternative to regular potato chips. Their unique
              flavor, crispy texture, and natural sweetness make them a
              delightful snack option for all ages. Yam chips are rich in
              nutrients like fiber, vitamins, and minerals, making them a
              guilt-free indulgence that provides nourishment. Whether enjoyed
              on their own or paired with dips and sauces, yam chips offer a
              delightful and wholesome snacking experience that leaves a smile
              on your face with every bite!
            </p>
            <p>
              43 Saves for later{" "}
              <span className="text-warning">&#9733;&#9733;&#9733;&#9733;</span>
            </p>
          </div>

          <div className="d-flex gap-4">
            <button
              className="btn btn-primary w-100 py-3 rounded-3"
              onClick={() => navigate("/home")}
            >
              Request item
            </button>
            <button
              className="btn btn-secondary  rounded-3 w-100 py-3 d-flex align-items-center justify-content-center gap-3"
              onClick={() => navigate("/home")}
            >
              <span className="text-warning fs-4">&#9733;</span> save for later
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <h6 className="text-muted text-end">
            Donated by: <span className="text-dark">Mr Emmanuel Akwesi</span>
          </h6>
          <img
            src={chooseItem[0].pic}
            alt=""
            height="auto"
            width="100%"
            className="rounded-4"
          />
          <p className="text-muted text-end">
            Available until <span className="text-dark">August 26th 2023</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
