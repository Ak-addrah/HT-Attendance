const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON requests

const DATA_FILE = "./attendees.json";

// Load existing attendees or initialize an empty array
const loadAttendees = () => {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }
  return [];
};

// Save attendees to a file
const saveAttendees = (attendees) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(attendees, null, 2), "utf8");
};

// Handle form submission
app.post("/register", (req, res) => {
  const { name, phone, gender, denomination, residence, source } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required!" });
  }

  const newAttendee = { id: Date.now(), name, phone, gender, denomination, residence, source };
  const attendees = loadAttendees();
  attendees.push(newAttendee);
  saveAttendees(attendees);

  res.status(201).json({ message: "Registration successful!", attendee: newAttendee });
});

// Fetch attendees
app.get("/attendees", (req, res) => {
  const attendees = loadAttendees();
  res.json(attendees);
});

app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
})
