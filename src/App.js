import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import ItemList from "./pages/ItemList";
import ItemDetail from "./pages/ItemDetail";
import "./index.css";
import { useState, useEffect } from "react";
import LoginPage from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/detail/:id" element={<ItemDetail />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ItemList onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
