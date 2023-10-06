import React, { useState } from "react";
import "./App.css";
import InputForm from "./components/Header/InputForm";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import EditForm from "./components/Edit/EditForm";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRankFormOpen, setIsRankFormOpen] = useState(false);
  const [rank, setRank] = useState(null);

  const openForm = () => {
    setIsFormOpen(true);
  };
  const openRankFrom = () => {
    setIsRankFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setIsRankFormOpen(false);
  };

  return (
    <div className="App">
      <Header openForm={openForm} openRankFrom={openRankFrom} />
      {isFormOpen && <InputForm onClose={closeForm} />}
      {isRankFormOpen && <EditForm closeForm={closeForm} />}
      {/* <div className="result-popup">
            <p>Rank: {rank}</p>
            <button onClick={closeForm}>OK</button>
          </div>
        </> */}
      <List />
    </div>
  );
};

export default App;

/*
- Must have menu to select option from
4. Update score
5. Delete one record
- Insert data - this needs to handle input data for the following Object and store in memory:
SAT Results
- Name (Unique Identifier)
- Address
- City
- Country
- Pincode
- SAT score
- Passed - this needs to be calculated in the backend as follows - if SAT score > 30% = Pass else Fail
- View all data - this should display all the data from the memory in Json format
- Get rank - this takes the name and returns their rank according to the data from the memory
- Update score - this allows to update SAT score for a candidate by name
- Delete one record - this deletes a record by name
 */
