import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BannerImage from "../assets/pexels-chan-walrus-958545.jpg";
import ItemList from "../Components/ItemList";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  limit,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const RequestPage = () => {
  const itemList = [
    {
      name: "Yam chips",
      pic: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      id: 7612,
    },
    {
      id: 1,
      name: "Canned Milk",
      pic: "https://thumbs.dreamstime.com/b/valencia-spain-march-home-food-pantry-storage-provision-to-survive-coronavirus-covid-pandemic-cuarentine-canned-tuna-184921995.jpg",
    },
    {
      id: 7613,
      name: "Preserved Fruits",
      pic: "https://images.squarespace-cdn.com/content/v1/54222358e4b0ef23d87a996b/1577802497997-D2EJBJRRCM7MD2IM1OPV/cr-nestle-golden-morn-cereal-250g.jpg",
    },
    {
      name: "Cheese Balls",
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

  const donationCategories = [
    {
      value: "",
      label: "Pick a category that suits your item",
      selected: true,
      disabled: true,
    },
    { value: "food", label: "Food Items" },
    { value: "money", label: "Monetary Items" },
    { value: "beverages", label: "Beverages" },
    { value: "clothing", label: "Clothing" },
    { value: "household", label: "Household Items" },
    { value: "personal-care", label: "Personal Care Products" },
    { value: "toys", label: "Toys and Games" },
    { value: "books", label: "Books and Educational Materials" },
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "pet-supplies", label: "Pet Supplies" },
    { value: "school-supplies", label: "School Supplies" },
    { value: "sports-equipment", label: "Sports Equipment" },
    { value: "medical-supplies", label: "Medical Supplies" },
    { value: "other", label: "Other" },
  ];

  const [filter, setFilter] = useState(false);
  const [list, setItemList] = useState([]);

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
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    fetchData(); // Immediately invoke the fetchData function
  }, []);

  console.log(list);

  return (
    <div className="container">
      {filter && (
        <div className="position-absolute bg-light rounded-4 shadow-lg  px-5 pb-5 top-50 start-50 translate-middle">
          <i
            role="button"
            class="fa-solid fa-xmark text-end w-100 p-3 fs-4 position-absolute end-0"
            onClick={() => {
              setFilter(false);
            }}
          ></i>
          <h4 className="mt-5">Filter</h4>
          <form>
            <div className="mb-4">
              <label>Choose category</label>
              <select className="form-select border-2 mb-4">
                {donationCategories.map((category, index) => (
                  <option
                    key={index}
                    value={category.value}
                    selected={category.selected ? "selected" : null}
                    disabled={category.disabled ? "disabled" : null}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
              <label>Search for item</label>
              <input
                type="text"
                className="form-control  border-2 rounded-3"
                placeholder="item name"

                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
        </div>
      )}

      <div className="image-container row  px-sm-0 px-3">
        <div
          className="col-12 mt-4 rounded-5"
          style={{
            backgroundImage: `url(${BannerImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            height: "400px",
            width: "100%",
          }}
        ></div>
      </div>
      <div className="row pt-4 my-auto">
        <div className="col">
          <h5>Available items</h5>
        </div>
        <div className="col text-end">
          <h5
            role="button"
            className="text-muted "
            onClick={() => setFilter(!filter)}
          >
            <i className="fa-solid fa-sliders"></i> Filter
          </h5>
        </div>
      </div>
      <div className="row justify-content-start gap-auto">
        {list.map((item, index) => {
          return (
            <Link to={`/detail/${item.id}`} className="col-sm-3 py-3">
              <ItemList name={item.item} pic={item.itemImage} key={index} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RequestPage;
