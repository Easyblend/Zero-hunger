import { collectionGroup, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebaseConfig";

const ItemDetail = () => {
  const detail = useParams();

  const navigate = useNavigate();

  const [item, setItemList] = useState(null);
  const [newList, setNewList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemRef = collectionGroup(db, "items");
        const querySnapshot = await getDocs(itemRef);

        // Create an array to store the fetched items
        const items = [];

        // Loop through the sub-collection query snapshots and collect the data from sub-documents
        querySnapshot.forEach((subDoc) => {
          const subData = subDoc.data();
          items.push(subData); // Add the sub-document data to the "items" array
        });

        // Update the component state with the fetched items
        setItemList(items);

        const chooseItem = items?.filter((item) => {
          return item.id == detail.item;
        });

        setNewList(chooseItem);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    fetchData(); // Immediately invoke the fetchData function
  }, []);

  return newList ? (
    <div className="container pt-5">
      <div className="row pt-2 justify-content-between">
        <div className="col-12 col-lg-5">
          <h6 className="text-muted">Distance from FDC</h6>
          <div className="mt-5">
            <h2>{newList[0]?.item}</h2>
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
            Donated by: <span className="text-dark">{newList[0]?.name}</span>
          </h6>
          <img
            src={newList[0]?.itemImage}
            alt=""
            height="auto"
            width="100%"
            className="rounded-4"
          />
          <p className="text-muted text-end">
            Available until <span className="text-dark">21st August 2023</span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className=" position-absolute top-50 start-50 translate-middle">
      <div
        class="spinner-border text-primary h4"
        role="status"
        style={{ height: "3rem", width: "3rem" }}
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default ItemDetail;
