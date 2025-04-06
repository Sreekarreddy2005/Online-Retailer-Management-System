import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            console.log("Attempting login with:", { email, password, role: "user" });
            
            const response = await axios.post("http://localhost:5000/login", { 
                email, 
                password, 
                role: "user" 
            });
            
            console.log("Login response:", response.data);
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            alert("Login successful!");
            navigate("/browse-products");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>User Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
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
  
export default UserLogin;