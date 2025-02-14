import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("Error registering user");
    }
  };
  return (
    <div className="mt-0 p-5 font-open-sans">
      <p className="font-logo-font text-[24px]">Kobby Wears</p>
      <div className="mt-5 flex flex-col gap-3">
        <h1 className="font-forum font-bold text-3xl">Sign Up</h1>
        <span className="font-normal text-[14px] flex gap-2">
          Create a free account or{" "}
          <Link
            to="/login"
            className="underline text-blue-800 underline-offset-2"
          >
            Login
          </Link>
        </span>
      </div>
      <form onSubmit={handleRegister} className="mt-10 flex flex-col gap-5">
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
          className="bg-black w-full text-center text-white p-3 font-semibold rounded-xl"
          type="submit"
        >
          Register
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
