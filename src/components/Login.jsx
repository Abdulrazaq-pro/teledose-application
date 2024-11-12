import { useState } from "react";
import { firebaseLogin } from "../lib/firebase";
import CustomToast from "./CustomToast";

const Login = ({ onLoginSuccess, onToggleSignup }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true); // Set loading state before starting login process

    try {
      await firebaseLogin(identifier, password);
      setSuccess(true);
      onLoginSuccess(); // Notify Home component of successful login
    } catch (err) {
      // Provide more detailed feedback
      const errorMessage =
        err.code === "auth/user-not-found"
          ? "User not found."
          : err.code === "auth/wrong-password"
          ? "Incorrect password."
          : "Failed to login. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-green-600 text-3xl font-bold text-center mb-6">
        Login
      </h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <form onSubmit={handleLogin} className="flex flex-col">
        <label htmlFor="identifier" className="mb-2 text-gray-700">
          Username or Email
        </label>
        <input
          type="text"
          id="identifier"
          className="p-3 border text-gray-700 rounded-md mb-4"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Enter your email or username"
          required
        />

        <label htmlFor="password" className="mb-2 text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="p-3 border text-gray-700 rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`p-3 text-white rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 cursor-pointer"
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <button
        onClick={onToggleSignup}
        className="text-green-600 underline text-center w-full mt-4"
      >
        Don&apos;t have an account? Sign up here
      </button>

      {/* Success toast with auto-close on success */}
      <CustomToast
        title="Login Successful!"
        description="Welcome back!"
        open={success}
        onOpenChange={setSuccess}
      />
    </div>
  );
};

export default Login;
