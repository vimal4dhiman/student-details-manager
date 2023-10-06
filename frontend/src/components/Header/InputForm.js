import React, { useState } from "react";
import "./InputForm.css";

const InputForm = ({ onClose, products }) => {
  const [formData, setformData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
    satScore: "",
    passed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "satScore") {
      const score = Number(value);

      if (!(score >= 0 && score <= 1600)) {
        alert("Invalid SAT Score. It should be between 0 and 1600.");
      } else {
        setformData({
          ...formData,
          [name]: score,
        });
      }
    } else {
      setformData({
        ...formData,
        [name]: value,
      });
    }
  };

  const createNewStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/satdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Data saved");
      } else {
        throw new Error("Failed to save the student data");
      }
    } catch (error) {
      console.error("Error saving the student data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createNewStudentData();
    onClose();
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <h2>Input new information</h2>
        {/* <h4>To edit an existing product, enter it's title</h4> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="satScore">SAT Score:</label>
            <input
              type="number"
              id="satScore"
              name="satScore"
              value={formData.satScore}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
