import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-0 p-5 font-open-sans">
      <p className="font-logo-font text-[24px]">Kobby Wears</p>

      <div className="mt-5 flex flex-col gap-3">
        <h1 className="font-forum font-bold text-3xl">Login</h1>
        <span className="font-normal text-[14px] flex gap-2">
          Not having an account?{" "}
          <Link
            to="/register"
            className="underline text-blue-800 underline-offset-2"
          >
            Register
          </Link>
        </span>
      </div>
      <form
        className="mt-10 flex flex-col gap-5"
        onSubmit={handleLogin}
        action=""
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[16px] font-semibold">
            Username or Email
          </label>
          <input
            className="w-full border p-2 border-gray-400 rounded-sm"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[16px] font-semibold">
            Password
          </label>
          <input
            className="w-full border p-2 border-gray-400 rounded-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <button
          className="bg-black flex justify-center items-center w-full text-center text-white p-3 font-semibold rounded-xl"
          type="submit"
        >
          {loading ? (
            <img src="/loading2.svg" className="w-10 h-5" alt="" />
          ) : (
            "Login"
          )}
        </button>
        {error && (
          <div className="flex items-center justify-center text-center">
            <p className="font-nova text-red-600">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
