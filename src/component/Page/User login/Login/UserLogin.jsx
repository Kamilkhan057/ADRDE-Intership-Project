// pages/UserLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaSyncAlt } from "react-icons/fa"; // Import eye icons and sync icon

function UserLogin() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [form, setForm] = useState({
    employeeId: "", // New field for Employee ID
    postInAssociation: "", // New field for Post in Association
    email: "",
    password: "",
    captchaInput: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success message

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoginSuccess(false); // Clear previous success messages

    if (form.captchaInput !== captcha.toString()) {
      setError("Incorrect CAPTCHA");
      return;
    }

    // Simulate login success
    // In a real application, you would send credentials to a backend for authentication
    console.log("Attempting user login with:", form);
    // For demonstration, we'll assume login is always successful if CAPTCHA is correct
    setLoginSuccess(true);
    setTimeout(() => {
      navigate("/home"); // Navigate to user dashboard after a short delay
    }, 1500); // Show success message for 1.5 seconds
  };

  const handleReset = () => {
    setForm({
      employeeId: "",
      postInAssociation: "",
      email: "",
      password: "",
      captchaInput: "",
    });
    setCaptcha(Math.floor(1000 + Math.random() * 9000)); // Generate new CAPTCHA on reset
    setError("");
    setLoginSuccess(false);
  };

  const refreshCaptcha = () => {
    setCaptcha(Math.floor(1000 + Math.random() * 9000));
    setForm({ ...form, captchaInput: "" }); // Clear CAPTCHA input on refresh
  };

  // Function to toggle password visibility for 1 second
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 1000); // Hide password after 1 second
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
      {/* Role Switch Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
        <button
          onClick={() => navigate('/login/user')}
          className={`min-w-[100px] px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
            window.location.pathname === '/login/user'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          User
        </button>
        <button
          onClick={() => navigate('/login/it')}
          className={`min-w-[100px] px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
            window.location.pathname === '/login/it'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          IT Team
        </button>
        <button
          onClick={() => navigate('/login/director')}
          className={`min-w-[100px] px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
            window.location.pathname === '/login/director'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Director
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-xl font-bold text-center text-blue-600">User Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Employee ID Input */}
          <div>
            <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              required
              placeholder="Enter Employee ID"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
            />
          </div>

          {/* Post in Association Input */}
          <div>
            <label htmlFor="postInAssociation" className="block text-sm font-semibold text-gray-700 mb-1">
              Your Post in Association
            </label>
            <input
              type="text"
              id="postInAssociation"
              name="postInAssociation"
              value={form.postInAssociation}
              onChange={handleChange}
              required
              placeholder="e.g., Member, Secretary, Treasurer"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Use the new toggle function
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* CAPTCHA Section */}
          <div className="mb-4">
            <label htmlFor="captchaInput" className="block text-sm font-semibold text-gray-700 mb-1">
              CAPTCHA
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-2 text-lg font-bold text-blue-600 bg-gray-100 rounded-md shadow-inner tracking-widest flex items-center justify-between">
                <span>{captcha}</span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-gray-500 hover:text-blue-600 transition duration-150"
                  aria-label="Refresh CAPTCHA"
                >
                  <FaSyncAlt size={16} />
                </button>
              </div>
              <input
                type="text"
                id="captchaInput"
                name="captchaInput"
                value={form.captchaInput}
                onChange={handleChange}
                required
                placeholder="Enter CAPTCHA"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1 animate-pulse">
                {error}
              </p>
            )}
          </div>

          {/* Login and Reset Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-xl transition duration-200"
            >
              Reset
            </button>
          </div>

          {/* Login Success Message */}
          {loginSuccess && (
            <p className="text-green-600 text-center font-semibold mt-4 animate-fadeIn">
              Login Successfully! Redirecting...
            </p>
          )}

          {/* Google Login */}
          <div className="flex items-center justify-center mt-4">
            <FcGoogle className="text-2xl mr-2" />
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Login with Google</span>
          </div>

          {/* Links for Register and Forgot Password */}
          <div className="text-sm text-center mt-2">
            <span className="text-gray-600">Don’t have an account?</span>
            <Link to="/register" className="text-blue-600 ml-1 font-medium hover:underline">Register</Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link to="/forgot-password" className="text-blue-600 font-medium hover:underline">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
