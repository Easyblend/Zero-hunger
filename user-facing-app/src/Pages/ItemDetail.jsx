import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import useUserHook from "../Utils/useUserHook";

const ItemDetail = () => {
  const detail = useParams();

  const navigate = useNavigate();

  const [newList, setNewList] = useState(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const { user } = useUserHook();

  const [latitude, setLatitude] = useState(2.03);
  const [longitude, setLongitude] = useState(0.7367);
  const [location, setLocation] = useState("unknown");

  const key = "69b7ace1292f4680e6ec6440f4372d2e";

  if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

    async function fetchLocation() {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${key}`
      );
      const data = await response.json();

      // Assuming the response structure is accurate, update location state
      setLocation(data[0]?.name + ", " + data[0]?.state);
    }

    fetchLocation();
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
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

        const chooseItem = items?.filter((item) => {
          return item.id === detail.item;
        });

        setNewList(chooseItem);
      } catch (error) {
        alert("Error getting documents:");
      }

    };

    fetchData(); // Immediately invoke the fetchData function
  }, []);




  const sendRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "Requests"), {
        name: user.displayName,
        email: user.email,
        item: newList[0].item,
        date: serverTimestamp(),
        location: location || null,
      });

      await fetch(
        `https://api.elasticemail.com/v2/email/send?apikey=C81D994DCDC4B9551415D1D7258D6A91F4FD2031A0A26963776212B6849377EFB89044BC96901D28C6D35C272275549A&msgTo=kenzieema072@gmail.com&from=kenzieemma072@gmail.com&bodyHtml=<h1>${newList[0]?.item} Request from <h5>${user.email}</h5></h1><p>${user.displayName} has requested ${newList[0]?.item} <hr>${location} </p>&subject=New item Request`
      );


      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      alert("Server Error: Please try again later");
    }
  };

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
          <div className="d-flex gap-4 flex-wrap">
            {!loading ? (
              !success ? (
                <button
                  className="btn btn-primary w-100 py-3 rounded-3"
                  onClick={sendRequest}
                >
                  Request item
                </button>
              ) : (
                <div className="mx-auto text-center">
                  <p className="py-0 my-0"> Item Request </p>
                  <h3 className="text-success my-0 py-0">SuccessFully Made</h3>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8632/8632729.png"
                    alt=""
                    width="100px"
                    height="100px"
                    color="yello"
                  />
                  <div className="mt-3">
                    <p>Our Team will contact you soon !!</p>
                    <button
                      className="btn btn-success text-light"
                      onClick={() => navigate("/home")}
                    >
                      Return Home
                    </button>
                  </div>
                </div>
              )
            ) : (
              <button
                className="btn btn-primary py-3 rounded-3 w-100 "
                disabled
              >
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                submitting request
              </button>
            )}

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
            alt="photo"
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
        className="spinner-border text-primary h4"
        role="status"
        style={{ height: "3rem", width: "3rem" }}
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default ItemDetail;
