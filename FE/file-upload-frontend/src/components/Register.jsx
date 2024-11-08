import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser(username, password);
      alert("Registration Successful please login to continue");
      navigate("/login");
      setToken(data.token);
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="register-input-div">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
