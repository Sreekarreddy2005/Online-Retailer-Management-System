import React, { useState } from "react";
import axios from "axios";

const UserRegister = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", user, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(response.data.message || "Registration successful!");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error("Error registering user:", error.response?.data || error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Registration</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Full Name" value={user.name} onChange={handleChange} required style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { width: "100%", maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column" },
  input: { marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" },
  button: { padding: "10px", backgroundColor: "green", color: "white", fontSize: "16px", border: "none", borderRadius: "5px", cursor: "pointer" },
  message: { color: "red" },
};

export default UserRegister;
