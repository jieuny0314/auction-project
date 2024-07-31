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
    // localStorage에서 로그인 상태를 가져옴
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    // 로그인 성공 시 localStorage에 로그인 상태를 저장
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  console.log(isLoggedIn);

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 로그인 상태를 제거
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<ItemList />} /> */}
          <Route path="/detail/:id" element={<ItemDetail />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}

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
