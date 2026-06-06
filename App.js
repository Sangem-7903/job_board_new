import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

/* ================= JOB BOARD ================= */

function JobBoard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "Java Full Stack Developer",
      company: "TCS",
      location: "Mumbai",
      salary: "6 - 10 LPA",
      description: "Spring Boot, React, REST APIs"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Infosys",
      location: "Pune",
      salary: "5 - 8 LPA",
      description: "React, JavaScript, HTML, CSS"
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Wipro",
      location: "Hyderabad",
      salary: "7 - 12 LPA",
      description: "Spring Boot, Microservices, PostgreSQL"
    }
  ];

  
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      <header style={styles.header}>
        <h1 style={styles.logo}>⭐ Star Aline Job Board</h1>
        <p style={styles.subtitle}>
          Find your dream job with AI-powered matching
        </p>
      </header>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.jobContainer}>
        {filteredJobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h2 style={styles.title}>{job.title}</h2>
            <h3 style={styles.company}>{job.company}</h3>

            <p>📍 {job.location}</p>
            <p>💰 {job.salary}</p>
            <p>{job.description}</p>

            <button
              onClick={() => navigate(`/apply/${job.id}`)}
              style={styles.button}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        © 2026 Star Aline Job Board
      </footer>
    </div>
  );
}

/* ================= APPLY FORM ================= */

function ApplyForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 10-digit validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      alert("❌ Please enter valid 10-digit phone number");
      return;
    }

    alert("✅ Application Submitted Successfully!");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={styles.backButton}
      >
        ⬅ Back
      </button>

      <h2>Apply Form</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
<input
  placeholder="First Name"
  value={firstName}
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
          style={styles.inputBox}
          value={phone}
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value;

            // allow only numbers
            if (!/^\d*$/.test(value)) return;

            setPhone(value);
          }}
        />

        <button type="submit" style={styles.submitBtn}>
          Submit Application
        </button>

      </form>
    </div>
  );
}

/* ================= MAIN APP ================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobBoard />} />
        <Route path="/apply/:jobId" element={<ApplyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  header: {
    textAlign: "center",
    padding: "20px",
    background: "#0f172a",
    color: "white"
  },
  logo: { margin: 0 },
  subtitle: { marginTop: "5px", fontSize: "14px", opacity: 0.8 },
  searchBox: { textAlign: "center", margin: "20px" },
  input: {
    width: "60%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  jobContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  card: {
    background: "white",
    padding: "20px",
    margin: "10px",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  title: { margin: "0 0 5px 0" },
  company: { color: "#555" },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  footer: {
    textAlign: "center",
    padding: "15px",
    marginTop: "20px",
    background: "#0f172a",
    color: "white"
  },
  inputBox: {
    margin: "8px 0",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  submitBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },
  backButton: {
    padding: "8px 12px",
    marginBottom: "10px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default App;