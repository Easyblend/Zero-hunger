import React, { useState } from "react";
import DonateBanner from "../assets/woman.jpg";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import useUserHook from "../Utils/useUserHook";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Send = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);

  const [success, setSuccess] = useState(false);

  const { user } = useUserHook();

  const donationCategories = [
    {
      value: "",
      label: "Pick a category that suits your item",
      selected: true,
      disabled: true,
    },
    {
      value: "food",
      label: "Food Items",
      imgURL:
        "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
    },
    {
      value: "money",
      label: "Monetary Items",
      imgURL:
        "https://media.istockphoto.com/id/1025321868/photo/money-from-ghana.jpg?b=1&s=612x612&w=0&k=20&c=deSk-3XfQHI5cTYRFzdFG4FKzDrzioGpuB3DhbfbpkA=",
    },
    {
      value: "beverages",
      label: "Beverages",
      imgURL:
        "https://images.pexels.com/photos/8743948/pexels-photo-8743948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      value: "clothing",
      label: "Clothing",
      imgURL:
        "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      value: "household",
      label: "Household Items",
      imgURL:
        "https://nypost.com/wp-content/uploads/sites/2/2022/03/Best-House-Cleaning-Products-feature-image.jpg?quality=75&strip=all",
    },
    {
      value: "personal-care",
      label: "Personal Care Products",
      imgURL:
        "https://cdn.sanity.io/images/92ui5egz/production/bba14bbd0da234e7c3eb8feccdb9f370fdcba51c-3840x2160.png?rect=0,72,3840,2016&w=1200&h=630&fm=jpg",
    },
    {
      value: "toys",
      label: "Toys and Games",
      imgURL:
        "https://cdn.popshelf.com/content/dam/popshelf/category-images/toys/hero-image/Toys_Main-Mobile-1.jpg",
    },
    {
      value: "books",
      label: "Books and Educational Materials",
      imgURL:
        "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
    },
    {
      value: "electronics",
      label: "Electronics",
      imgURL:
        "https://www.thenoiseuk.com/wp-content/uploads/2021/10/Consumer-Electronics-Appliance_blog.jpeg",
    },
    {
      value: "furniture",
      label: "Furniture",
      imgURL:
        "https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      value: "pet-supplies",
      label: "Pet Supplies",
      imgURL:
        "https://images.squarespace-cdn.com/content/v1/5c5d97629d41495faf08a6dc/1554557960642-WTJKGYZI7UGLIPE32UVE/Pet.Supplies.Family.Pet.Advocates.JPG?format=1000w",
    },
    {
      value: "school-supplies",
      label: "School Supplies",
      imgURL:
        "https://blog.schoolspecialty.com/wp-content/uploads/2022/07/feat-image-23-must-have-classroom-supplies-1200x624.jpg",
    },
    {
      value: "sports-equipment",
      label: "Sports Equipment",
      imgURL:
        "https://media.istockphoto.com/id/905105146/photo/sports-equipment-on-green-grass-top-view.jpg?b=1&s=612x612&w=0&k=20&c=4hsQEvaaq7bFE6MNQObA_3ueKN7wCU5XeyLXa_35pY8=",
    },
    {
      value: "medical-supplies",
      label: "Medical Supplies",
      imgURL:
        "https://medicalcallservice.com/wp-content/uploads/2019/11/List-of-Medical-Supplies.jpg",
    },
    {
      value: "other",
      label: "Other",
      imgURL:
        "https://www.prontosupplies.com/wp-content/uploads/2016/11/Pronto-Supplies-1.jpg",
    },
  ];

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
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
                  value={location}
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
