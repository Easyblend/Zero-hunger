import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import DonateBanner from "../assets/woman.jpg";

const Send = () => {
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

  const [form, setForm] = useState(2);

  useEffect(() => {
    const unsubscribe = setForm(1);

    return unsubscribe;
  }, []);

  return (
    <div className="container-fluid">
      <div className="row px-3 ">
        <div className=" col-12 col-sm-6 px-5 mt-4">
          <h6 className="text-start">Send an Item</h6>
          <form className="col-10">
            {form == 1 ? (
              <>
                <div className="my-4">
                  <label>Item type</label>
                  <select className="form-select border-2">
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
                </div>
                <div className="my-4">
                  <label>Item Description</label>
                  <textarea
                    type="text"
                    className="form-control border-2 rounded-3"
                    placeholder="Describe the type of donation"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="my-4">
                  <label>Available date for Pickup</label>
                  <input
                    type="date"
                    className="form-control  border-2 rounded-3"
                    placeholder="item type..."

                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label>Picture of the item</label>
                  <input
                    type="file"
                    className="form-control  border-2 rounded-3"
                    placeholder="tel: (+233)"

                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <hr className="mt-5" />
                <button
                  className="btn btn-primary w-100 py-3 rounded-3"
                  onClick={() => setForm(2)}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <h5 className="text-muted text-center">Doners Details </h5>
                <div className="my-2">
                  <label>Doner's Name</label>
                  <input
                    type="text"
                    className="form-control  border-2 rounded-3"
                    placeholder="name"

                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label>Doner's Phone number</label>
                  <input
                    type="tel"
                    className="form-control  border-2 rounded-3"
                    placeholder="tel: (+233)"

                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label>Address of Doner</label>
                  <input
                    type="text"
                    className="form-control  border-2 rounded-3"
                    placeholder="where item would be picked up"

                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label>Short note from Doner</label>
                  <textarea
                    type="text"
                    className="form-control  border-2 rounded-3"
                    placeholder="A short note you would like to place on the item"

                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-secondary w-100 py-3 rounded-3 "
                    onClick={() => setForm(1)}
                  >
                    <i className="fa-solid fa-arrow-left-long "></i> Previous
                  </button>
                  <button className="btn btn-primary w-100 py-3 rounded-3">
                    Donate item
                  </button>
                </div>
              </>
            )}
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
