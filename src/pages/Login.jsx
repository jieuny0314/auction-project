import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        onLogin();
        alert("로그인 성공!");
        navigate("/");
      } else {
        setError("사용자 이름 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-[300px] m-5 p-5 border border-gray-300 rounded-lg shadow-md bg-gray-100">
      <h2 className="text-center text-xl font-bold mb-5">로그인</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="mb-3">
          <label htmlFor="username" className="block mb-2">
            사용자 이름:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 text-base border border-gray-300 rounded-md box-border"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block mb-2">
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 text-base border border-gray-300 rounded-md box-border"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white border-none rounded-md cursor-pointer text-base hover:bg-green-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
