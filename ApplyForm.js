import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApplyForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [phoneError, setPhoneError] = useState("");

  const jobId = 1;

  // ✅ SUBMIT FUNCTION
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ STRONG VALIDATION (ONLY DIGITS + EXACT 10 LENGTH)
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    alert("❌ Enter valid 10-digit phone number");
    return;
  }

  const payload = {
    firstName,
    lastName,
    email,
    phone,
    experience,
    skills,
    jobId
  };

  try {
    const response = await fetch("http://localhost:8080/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert("✅ Application Submitted Successfully!");
      navigate("/");
    } else {
      alert("❌ Submission Failed!");
    }

  } catch (error) {
    console.error(error);
    alert("❌ Server Error!");
  }
};

  return (
    <div style={{ padding: "20px" }}>

      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate("/")}
        style={styles.backButton}
      >
        ⬅ Back
      </button>

      <h2>Apply Form</h2>

      <form onSubmit={handleSubmit}>

<input
  placeholder="First Name"
  value={first_name}
  onChange={(e) => setFirstName(e.target.value)}
/>

<input
  placeholder="Last Name"
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
/>

<input
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  placeholder="Phone (10 digits)"
  style={styles.input}
  value={phone}
  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
  maxLength={10}
/>
        {/* ERROR MESSAGE */}
        {phoneError && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {phoneError}
          </p>
        )}

        <input
          placeholder="Experience"
          style={styles.input}
          onChange={(e) => setExperience(e.target.value)}
        />

        <input
          placeholder="Skills"
          style={styles.input}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button type="submit" style={styles.submit}>
          Submit Application
        </button>

      </form>
    </div>
  );
}

/* STYLES */
const styles = {
  backButton: {
    padding: "8px 12px",
    marginBottom: "10px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "250px"
  },
  submit: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px"
  }
};

export default ApplyForm;