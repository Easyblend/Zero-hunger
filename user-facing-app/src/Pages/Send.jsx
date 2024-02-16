import React, { useEffect, useState } from "react";
import DonateBanner from "../assets/woman.jpg";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import useUserHook from "../Utils/useUserHook";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { donationCategories } from "../Utils/DonationsData";
const Send = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);

  const [success, setSuccess] = useState(false);

  const { user } = useUserHook();

  const [latitude, setLatitude] = useState(2.03);
  const [longitude, setLongitude] = useState(0.7367);

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
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      // Create a reference to the "Donations" document
      const donationsRef = doc(collection(db, "Donations"), item);
      // Create a reference to the "items" sub-collection under the "Donations" document
      // Add the data to the "items" sub-collection
      await addDoc(collection(donationsRef, "items"), {
        item,
        itemImage: image,
        location: location || "Kumasi, Knust campus",
        name: user.displayName,
        email: user.email,
        pick_up_date: date,
        date: serverTimestamp(),
        id: uuidv4(),
        locationCordinate: { latitude, longitude },
      });

      await fetch(
        `https://api.elasticemail.com/v2/email/send?apikey=C81D994DCDC4B9551415D1D7258D6A91F4FD2031A0A26963776212B6849377EFB89044BC96901D28C6D35C272275549A&msgTo=kenzieema072@gmail.com&from=kenzieemma072@gmail.com&bodyHtml=<h1>Incoming ${item} Donation</h1><p>${user.displayName} has Donanted ${item}, Request Location: ${location}</p>&subject=New item Requested`
      );

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.split("/")[1] || "An error occured")
      setSuccess(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row px-3 ">
        <div className=" col-12 col-sm-6 px-5 mt-4">
          <h6 className="text-start">Send an Item</h6>
          <form className="col-10" onSubmit={sendData}>
            <>
              <div className="my-4">
                <label>Item type</label>
                <select
                  required
                  className="form-select border-2"
                  value={item} // Set the selected value here
                  onChange={(e) => {
                    setItem(e.target.value);
                    setImage(
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "data-imgurl"
                      )
                    );
                  }}
                >
                  {donationCategories.map((category, index) => (
                    <option
                      key={index}
                      value={category.value} // Set the value to the actual value
                      disabled={category.disabled}
                      data-imgurl={category.imgURL} // Store the imgURL as data attribute
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-4">
                <label>Location of Doner</label>
                <input
                  type="text"
                  className="form-control  border-2 rounded-3"
                  placeholder="where item would be picked up"
                  value={location || ""}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="my-4">
                <label>Available date for Pickup</label>
                <input
                  type="date"
                  className="form-control  border-2 rounded-3"
                  placeholder="item type..."
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <label>Picture of the item</label>
              {image && (
                <div className="my-2">
                  <img
                    src={image}
                    alt=""
                    width="50%"
                    height="50%"
                    className="rounded-4 shadow-lg"
                  />
                </div>
              )}

              <hr className="" />
              {!loading ? (
                !success ? (
                  <button
                    className="btn btn-primary w-100 py-3 rounded-3"
                    type="submit"
                  >
                    Donate Item
                  </button>
                ) : (
                  <div className="mx-auto text-center">
                    <p className="py-0 my-0"> Donation Request </p>
                    <h3 className="text-success my-0 py-0">
                      SuccessFully Made
                    </h3>
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
                  className="btn btn-primary py-3 w-100 mb-3"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  submitting
                </button>
              )}
            </>
          </form>
        </div>
        <div
          className=" col-6 d-none d-sm-block rounded-2"
          style={{
            backgroundImage: `url(${DonateBanner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            height: "90vh",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Send;
