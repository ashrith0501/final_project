
import React, { useState } from "react";

const Dashboard = ({
  currentUser,
  subjects,
  uploadedBooks,
  setUploadedBooks,
  users,
  setUsers,
  onLogout,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (currentUser.role !== "admin") return;

    const form = e.target;
    const name = form.bookName.value.trim();
    const subject = form.bookSubject.value;
    const file = form.bookFile.files[0];

    if (!name || !subject || !file) {
      alert("Please fill all fields.");
      return;
    }

    setUploadedBooks((prev) => {
      const updated = { ...prev };
      if (!updated[subject]) updated[subject] = [];
      updated[subject].push({ name, file });
      return updated;
    });

    alert(`📚 Book "${name}" uploaded under ${subject}`);
    form.reset();
  };

  const renderUploadedBooks = (subject = null) => {
    const displaySubjects = subject ? [subject] : Object.keys(uploadedBooks);
    if (displaySubjects.length === 0) return <p>No books uploaded yet.</p>;

    return displaySubjects.map((sub) =>
      uploadedBooks[sub] && uploadedBooks[sub].length > 0 ? (
        <div
          key={sub}
          style={{
            marginBottom: 15,
            padding: 10,
            background: "#fafafa",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontWeight: "600", marginBottom: 6 }}>{sub}:</p>
          <ul style={{ paddingLeft: 20 }}>
            {uploadedBooks[sub].map((book, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>
                <a
                  href={URL.createObjectURL(book.file)}
                  download={book.file.name}
                  style={{ color: "#1e90ff", textDecoration: "none" }}
                >
                  📘 {book.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null
    );
  };

  const toggleStudentAccess = (username) => {
    setUsers((prev) =>
      prev.map((u) => (u.username === username ? { ...u, access: !u.access } : u))
    );
  };

  const addStudent = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.newStudentName.value.trim();
    const password = form.newStudentPass.value.trim();
    if (!username || !password) return alert("Fill all fields.");

    const exists = users.find((u) => u.username === username);
    if (exists) return alert("Student username already exists.");

    setUsers((prev) => [...prev, { username, password, role: "student", access: true }]);
    alert(`✅ Student "${username}" added successfully!`);
    form.reset();
  };

  return (
    <div>
      <div
        style={{
          background: "#2c3e50",
          color: "white",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>KL University Library</h2>
        <button
          onClick={onLogout}
          style={{
            background: "#e74c3c",
            color: "white",
            padding: "8px 14px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <div style={{ padding: 20 }}>
        <h2>Welcome, {currentUser.username}</h2>

        {/* Subjects */}
        <h3>📖 Subjects</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 15,
            marginTop: 10,
          }}
        >
          {Object.keys(subjects).map((sub) => (
            <div
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              style={{
                background: "#ecf0f1",
                padding: 15,
                borderRadius: 8,
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "600",
                transition: "0.3s",
              }}
            >
              {sub}
            </div>
          ))}
        </div>

        {/* Admin Section */}
        {currentUser.role === "admin" && (
          <div
            style={{
              marginTop: 30,
              padding: 20,
              background: "#fefefe",
              borderRadius: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📤 Upload a Book</h3>
            <form onSubmit={handleUpload}>
              <input
                type="text"
                name="bookName"
                placeholder="Book Name"
                required
                style={{
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  width: "100%",
                  marginBottom: 10,
                }}
              />
              <select
                name="bookSubject"
                required
                style={{
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <option value="">Select Subject</option>
                {Object.keys(subjects).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <input type="file" name="bookFile" required style={{ marginBottom: 10 }} />
              <button
                type="submit"
                style={{
                  background: "#27ae60",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Upload Book
              </button>
            </form>

            {/* Add Student */}
            <div style={{ marginTop: 20 }}>
              <h3>➕ Add Student</h3>
              <form onSubmit={addStudent}>
                <input
                  type="text"
                  name="newStudentName"
                  placeholder="Student Username"
                  required
                  style={{
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    marginRight: 6,
                  }}
                />
                <input
                  type="text"
                  name="newStudentPass"
                  placeholder="Password"
                  required
                  style={{
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    marginRight: 6,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "6px 12px",
                    background: "#1abc9c",
                    border: "none",
                    borderRadius: 6,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </form>
            </div>

            {/* Student Access */}
            <div style={{ marginTop: 20 }}>
              <h3>👥 Student Access Control</h3>
              {users
                .filter((u) => u.role === "student")
                .map((stu) => (
                  <div
                    key={stu.username}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 6,
                      background: stu.access ? "#d4edda" : "#f8d7da",
                      borderRadius: 4,
                      marginBottom: 4,
                    }}
                  >
                    <span>{stu.username}</span>
                    <button
                      onClick={() => toggleStudentAccess(stu.username)}
                      style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        border: "none",
                        cursor: "pointer",
                        background: stu.access ? "#c0392b" : "#27ae60",
                        color: "white",
                      }}
                    >
                      {stu.access ? "Disable" : "Enable"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Books */}
        <div style={{ marginTop: 30 }}>
          <h3>📚 Available Books</h3>
          {renderUploadedBooks(selectedSubject)}
        </div>

        {/* Topics */}
        {selectedSubject && (
          <div
            style={{
              marginTop: 30,
              background: "#f0f8ff",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <h3>{selectedSubject} Topics:</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {subjects[selectedSubject].map((topic) => (
                <div
                  key={topic}
                  style={{
                    background: "#dff9fb",
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onClick={() => alert(`Content coming soon for ${topic}`)}
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
