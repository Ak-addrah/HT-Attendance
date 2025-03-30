import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AttendancePage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [denomination, setDenomination] = useState("");
  const [residence, setResidence] = useState("");
  const [source, setSource] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup

  useEffect(() => {
    const storedAttendees = JSON.parse(localStorage.getItem("attendees")) || [];
    setAttendees(storedAttendees);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      const newAttendee = { name, phone, gender, denomination, residence, source };
  
      try {
        const response = await fetch("http://localhost:8000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAttendee),
        });
  
        if (!response.ok) {
          throw new Error("Failed to register!");
        }
  
        const data = await response.json();
        setAttendees([...attendees, data.attendee]); // Update UI
        setName("");
        setPhone("");
        setGender("");
        setDenomination("");
        setResidence("");
        setSource("");
        setShowPopup(true);
        
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } catch (error) {
        console.error(error);
        alert("Error registering attendee!");
      }
    }
  };

  // Check for secret code
  const handleSecretCode = () => {
    const code = prompt("Enter Organizer Code:");
    if (code === "1234") {
      setIsOrganizer(true);
      localStorage.setItem("isOrganizer", "true");
    } else {
      alert("Incorrect Code!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 mt-5">
      {/* Success Popup */}
      {showPopup && (
        <div className="w-[250px] fixed top-10 bg-yellow-600 text-center font-bold text-lg text-white px-4 py-2 rounded-md shadow-lg transition-all animate-bounce">
        Welcome to the Pentecost Experience! Enjoy the programme!
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white p-6 shadow-md border-[7px] border-orange-600 rounded-2xl w-[350px] sm:w-[350px]">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-orange-600 pb-2">
          The Pentecost Experience
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-sm border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 text-sm border rounded-xl"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 text-sm border rounded-xl"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Denomination"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            className="w-full p-2 text-sm border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Residence"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            className="w-full p-2 text-sm border rounded-xl"
            required
          />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-2 text-sm border rounded-xl"
            required
          >
            <option value="" disabled>How did you hear about us?</option>
            <option value="Church Announcement">Church Announcement</option>
            <option value="Social Media">Social Media</option>
            <option value="Friend">Friend</option>
            <option value="Media and Publications">Media and Publications</option>
            <option value="Others">Others</option>
          </select>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-2xl font-semibold shadow-md"
          >
            Check-in
          </button>
        </form>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-5">
        {isOrganizer && (
          <Link
            to="/attendees"
            className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm shadow-md"
          >
            📋 View Attendees
          </Link>
        )}
      </div>

      {/* Unlock button */}
      {!isOrganizer && (
        <button
          onClick={handleSecretCode}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-xl text-sm"
        >
          🔒 Unlock Organizer Mode
        </button>
      )}
    </div>
  );
};

export default AttendancePage;