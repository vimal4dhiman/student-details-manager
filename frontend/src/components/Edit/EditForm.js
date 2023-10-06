// FindRankForm.js (Create a new component for the Find Rank form)
import React, { useState } from "react";
import "./EditForm.css";

const Ranks = ({ closeForm }) => {
  const [name, setName] = useState("");
  // const [rank, setRank] = useState("");
  const [newSatScore, setNewSatScore] = useState("");

  const handleGetRank = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/satdata/getrank?name=${name}`
      );
      if (response.ok) {
        const result = await response.json();
        // setRank(result.studentRank);
        alert(`The rank of ${name} is ${result.studentRank}`);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error finding rank:", error);
    }
    closeForm();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/satdata/delete?name=${name}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert(`Deleted`);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
    closeForm();
  };

  const handleUpdateScore = async () => {
    const newScore = prompt("Enter the new SAT Score");

    if (newScore !== null) {
      setNewSatScore(newScore);

      try {
        const response = await fetch(
          `http://localhost:5000/satdata/updatescore?name=${name}&satScore=${newScore}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          alert("SAT score updated successfully");
          setName("");
          setNewSatScore("");
        } else if (response.status === 404) {
          alert("Student not found");
        } else {
          throw new Error("Failed to update SAT score");
        }
      } catch (error) {
        console.error("Error updating SAT score:", error);
      }
    }
    closeForm();
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h2>Edit Student Data</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="button" onClick={handleUpdateScore}>
              Update SAT Score
            </button>
            <button type="button" onClick={handleGetRank}>
              Get Rank
            </button>
            <button type="button" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ranks;
