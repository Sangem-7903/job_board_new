import React from "react";
import { useNavigate } from "react-router-dom";

function JobBoard() {
  const navigate = useNavigate(); // ✅ FIX HERE

  return (
    <div>

      <button onClick={() => navigate("/apply/1")}>
        Apply Now
      </button>

    </div>
  );
}

export default JobBoard;