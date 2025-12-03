import { useState } from "react";

export default function UserRegistration({ onSuccess }) {
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User saved: ", data);
        alert("User registered successfully!");
        setUserForm({
          email: "",
          username: "",
          password: "",
        });
        
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("Error registering user: " + err.message);
      });
  };

  return (
    <div style={{ padding: '20px', minWidth: '400px' }}> {/* Remove container styles */}
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <h5 className="card-title mb-0">Register User</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="username"
                placeholder="Username"
                value={userForm.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={userForm.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100 text-white">
              Register User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}