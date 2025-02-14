import {
  IconBasketHeart,
  IconLogout2,
  IconShoppingBag,
  IconShoppingCart,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "http://localhost:3001/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error("Error Fetching profile", error);
      });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:3001/profile",
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsername(response.data.username);
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Error updating profile");
      console.error("Error updating profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="mt-20 p-5 pt-0 font-nova">
      {isAuthenticated ? (
        <div>
          <div className="bg-red-100 pb-10 pt-3 pl-3 rounded-lg h-[50vh]">
            <h1 className="text-[20px] font-semibold">Hello, {username}</h1>
            <p className="text-[20px] font-semibold">Your Account</p>

            <div className="flex mt-5 items-center gap-5">
              <Link
                to="/cart"
                className="flex flex-col justify-center items-center gap-0.5"
              >
                <IconShoppingBag
                  className="bg-white p-2 flex items-center justify-center rounded-full text-red-300 shadow-md"
                  size={40}
                />
                <span className="text-[12px]">Cart</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex flex-col justify-center items-center gap-0.5"
              >
                <IconBasketHeart
                  className="bg-white p-2 flex items-center justify-center rounded-full text-red-300 shadow-md"
                  size={40}
                />
                <span className="text-[12px]">Wishlist</span>
              </Link>
              <div
                onClick={() => handleLogout()}
                className="flex cursor-pointer flex-col justify-center items-center gap-0.5"
              >
                <IconLogout2
                  className="bg-white p-2 flex items-center justify-center rounded-full text-red-300 shadow-md"
                  size={40}
                />
                <span className="text-[12px]">Logout</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-2xl">Update username?</p>
            <form
              onSubmit={handleUpdateProfile}
              className="flex mt-5 flex-col gap-3"
            >
              <input
                className="w-full border p-2 border-gray-400 rounded-sm"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New username"
                required
              />
              <button
                className="bg-black flex justify-center items-center w-full text-center text-white p-3 font-semibold rounded-xl"
                type="submit"
              >
                Update Profile
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center flex-col gap-3">
          <p>Have an account?</p>
          <Link
            to="/login"
            className="bg-black text-center w-64 p-1 text-white"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
