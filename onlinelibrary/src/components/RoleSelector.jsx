import React from "react";

const RoleSelector = ({ onSelectRole }) => {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1 style={{ color: "#2c3e50" }}>📚 Online Library</h1>
      <p style={{ marginTop: 10 }}>Select your role to login:</p>
      <button
        onClick={() => onSelectRole("admin")}
        style={{
          margin: 10,
          padding: "12px 24px",
          borderRadius: 8,
          background: "#b02b57",
          color: "white",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
        }}
      >
        Admin
      </button>
      <button
        onClick={() => onSelectRole("student")}
        style={{
          margin: 10,
          padding: "12px 24px",
          borderRadius: 8,
          background: "#1e90ff",
          color: "white",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
        }}
      >
        Student
      </button>
    </div>
  );
};

export default RoleSelector;



 
                                        main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Apps from './components/Apps.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Apps />
  </React.StrictMode>
);

