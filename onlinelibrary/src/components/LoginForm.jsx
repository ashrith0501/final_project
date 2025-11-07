// LoginForm.jsx
import React from "react";

const LoginForm = ({
  role,
  userid,
  setUserid,
  password,
  setPassword,
  onLogin,
  onBack,
}) => {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        textAlign: "center",
        padding: 20,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        Login as {role === "admin" ? "Admin" : "Student"}
      </h2>
      <form onSubmit={onLogin}>
        <div style={{ marginBottom: 15, textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: 5 }}>Username:</label>
          <input
            type="text"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 15, textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: 5 }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: role === "admin" ? "#b02b57" : "#1e90ff",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: 8,
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={onBack}
        style={{ marginTop: 15, border: "none", background: "transparent", color: "#555", cursor: "pointer" }}
      >
        ← Back
      </button>
    </div>
  );
};

export default LoginForm;
