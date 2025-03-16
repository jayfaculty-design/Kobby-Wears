import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  User,
  LogOut,
  Heart,
  MapPin,
  CreditCard,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Package,
} from "lucide-react";
import { Link } from "react-router";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock order history data (in a real app, you'd fetch this from your API)
  const orderHistory = [
    {
      id: "ORD-2023-001",
      date: "2023-11-15",
      status: "Delivered",
      total: 125.99,
      items: 3,
    },
    {
      id: "ORD-2023-002",
      date: "2023-12-02",
      status: "Processing",
      total: 89.5,
      items: 2,
    },
    {
      id: "ORD-2023-003",
      date: "2023-12-10",
      status: "Shipped",
      total: 210.75,
      items: 4,
    },
  ];

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Cotton Hoodie",
      price: 59.99,
      img_url: "/hoodie-1.jpg",
    },
    {
      id: 2,
      name: "Classic Denim Jeans",
      price: 79.99,
      img_url: "/jeans-1.jpg",
    },
  ];

  const fetchProfile = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate("/login");
      return;
    }

    axios({
      method: "get",
      url: "https://kobby-wears.onrender.com/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsername(response.data.username);
        setNewUsername(response.data.username);
        setEmail(response.data.email || "user@example.com"); // Fallback if API doesn't return email
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching profile", error);
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchProfile();
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleUpdateProfile = () => {
    if (newUsername.trim() === "") {
      setMessage({ text: "Username cannot be empty", type: "error" });
      return;
    }

    const token = localStorage.getItem("token");

    setIsLoading(true);
    axios({
      method: "put",
      url: "https://kobby-wears.onrender.com/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        username: newUsername,
      },
    })
      .then(() => {
        setUsername(newUsername);
        setMessage({ text: "Profile updated successfully!", type: "success" });
        setIsEditing(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        setMessage({
          text: "Failed to update profile. Please try again.",
          type: "error",
        });
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-neutral-200 h-20 w-20 mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-32 mb-2.5"></div>
          <div className="h-3 bg-neutral-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
          <User size={48} className="mx-auto text-neutral-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
          <p className="text-neutral-600 mb-8">
            Please sign in to view your profile and manage your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-white border border-neutral-300 text-neutral-800 px-6 py-3 rounded-md hover:bg-neutral-50 transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">My Account</h1>

      {/* Profile Header */}
      <div className="bg-neutral-50 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="bg-neutral-200 rounded-full h-24 w-24 flex items-center justify-center text-neutral-500">
          <User size={48} />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{username}</h2>
          <p className="text-neutral-500">{email}</p>
          <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors px-3 py-1 rounded-md hover:bg-red-50"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
            message.type === "error"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {message.type === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <CheckCircle size={20} />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="border-b border-neutral-200 mb-8">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "profile"
                ? "border-b-2 border-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "orders"
                ? "border-b-2 border-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "wishlist"
                ? "border-b-2 border-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "addresses"
                ? "border-b-2 border-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Addresses
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "payment"
                ? "border-b-2 border-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Payment Methods
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[50vh]">
        {/* Profile Details Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Profile Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-sm bg-neutral-100 hover:bg-neutral-200 transition-colors px-3 py-1.5 rounded-md"
                >
                  <Edit size={16} />
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewUsername(username);
                    setMessage({ text: "", type: "" });
                  }}
                  className="text-sm text-neutral-500 hover:text-neutral-700"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  />
                ) : (
                  <p className="text-neutral-900 bg-neutral-50 px-4 py-2 rounded-md">
                    {username}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <p className="text-neutral-900 bg-neutral-50 px-4 py-2 rounded-md">
                  {email}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Email cannot be changed. Contact support for assistance.
                </p>
              </div>

              {isEditing && (
                <div className="pt-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition-all w-full sm:w-auto"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === "orders" && (
          <div>
            <h3 className="text-lg font-medium mb-6">Your Orders</h3>

            {orderHistory.length === 0 ? (
              <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
                <Package size={48} className="mx-auto text-neutral-400 mb-4" />
                <h4 className="text-lg font-medium mb-2">No orders yet</h4>
                <p className="text-neutral-600 mb-6">
                  You haven't placed any orders yet.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-colors"
                  >
                    <div className="bg-neutral-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-neutral-500">
                          Placed on {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-sm text-neutral-600 hover:text-black flex items-center gap-1"
                        >
                          Details
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <p className="text-sm text-neutral-600">
                          {order.items} items
                        </p>
                        <p className="font-medium">
                          GH₵ {order.total.toFixed(2)}
                        </p>
                      </div>
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-sm bg-neutral-100 hover:bg-neutral-200 transition-colors px-4 py-2 rounded-md"
                      >
                        View Order
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            <h3 className="text-lg font-medium mb-6">Your Wishlist</h3>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
                <Heart size={48} className="mx-auto text-neutral-400 mb-4" />
                <h4 className="text-lg font-medium mb-2">
                  Your wishlist is empty
                </h4>
                <p className="text-neutral-600 mb-6">
                  Save items you love for later.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition-all"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="aspect-square bg-neutral-50 overflow-hidden">
                      <img
                        src={item.img_url}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      <p className="text-neutral-900 font-semibold mb-3">
                        GH₵ {item.price.toFixed(2)}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-neutral-800 transition-colors">
                          Add to Cart
                        </button>
                        <button className="p-2 text-red-500 hover:text-red-700 border border-neutral-200 rounded-md hover:bg-neutral-50">
                          <Heart size={18} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Your Addresses</h3>
              <button className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-neutral-800 transition-colors">
                <MapPin size={16} />
                Add New Address
              </button>
            </div>

            <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
              <MapPin size={48} className="mx-auto text-neutral-400 mb-4" />
              <h4 className="text-lg font-medium mb-2">No addresses saved</h4>
              <p className="text-neutral-600 mb-6">
                Add your shipping and billing addresses for faster checkout.
              </p>
              <button className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition-all">
                Add Address
              </button>
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "payment" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <button className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-neutral-800 transition-colors">
                <CreditCard size={16} />
                Add Payment Method
              </button>
            </div>

            <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
              <CreditCard size={48} className="mx-auto text-neutral-400 mb-4" />
              <h4 className="text-lg font-medium mb-2">
                No payment methods saved
              </h4>
              <p className="text-neutral-600 mb-6">
                Save your payment details for faster checkout.
              </p>
              <button className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition-all">
                Add Payment Method
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
