const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

/*SAT Results
- Name (Unique Identifier)
- Address
- City
- Country
- Pincode
- SAT score
- Passed - this needs to be calculated in the backend as follows - if SAT score > 30% = Pass welse Fail
- View all data - this should display all the data from the memory in Json format
- Get rank - this takes the name and returns their rank according to the data from the memory
- Update score - this allows to update SAT score for a candidate by name
- Delete one record - this deletes a record by name
- (Optional) Make use of a database of your choice
*/
const satDataSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, // Making the name field unique identifire
  },
  address: String,
  city: String,
  country: String,
  pincode: String,
  satScore: String,
  passed: String,
});

const SATData = mongoose.model("SAT Data", satDataSchema);

mongoose.connect("mongodb://127.0.0.1:27017/satdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

/**
 *
 * @param score Sat score of the person
 * @returns true if score > 30% of total(1600) which is 480 or else false
 */
const satScoreCalculation = (score) => parseInt(score) > 480;

// To fetch all the data from database
app.get("/satdata", async (req, res) => {
  try {
    const data = await SATData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Saving new data to the database
app.post("/satdata", async (req, res) => {
  try {
    const satData = new SATData(req.body);
    satData.passed = satScoreCalculation(satData.satScore)
      ? "Passed"
      : "Failed";
    await satData.save();
    res.status(201).json(satData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting the rank based on the input name
app.get("/satdata/getrank", async (req, res) => {
  try {
    const studentName = req.query.name;
    const students = await SATData.find();
    students.sort((a, b) => parseInt(b.satScore) - parseInt(a.satScore));
    const studentRank = students.findIndex((st) => st.name === studentName) + 1;

    if (!studentRank) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ studentRank });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Updating the sat score by name
app.put("/satdata/updatescore", async (req, res) => {
  try {
    const studentName = req.query.name;
    const newSatScore = req.query.satScore;

    const student = await SATData.findOne({ name: studentName });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.satScore = newSatScore;
    student.passed = satScoreCalculation(student.satScore)
      ? "Passed"
      : "Failed";

    await student.save();

    res.json({
      message: "SAT score updated successfully",
      updatedStudent: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Deleting the data based on input name
app.delete("/satdata/delete", async (req, res) => {
  try {
    const studentName = req.query.name;

    const deletedStudent = await SATData.findOneAndDelete({
      name: studentName,
    });

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found to delete" });
    }

    res.json({ message: "Student data deleted successfully", deletedStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
