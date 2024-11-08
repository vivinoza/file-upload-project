import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <Router>
      <div className="app">
        <Header token={token} setToken={setToken} />
        {!token ? (
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route
              path="/register"
              element={<Register setToken={setToken} />}
            />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path="/upload" element={<FileUpload token={token} />} />
              <Route path="/files" element={<FileList token={token} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
