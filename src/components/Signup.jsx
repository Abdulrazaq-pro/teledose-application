import { useState } from "react";
import { firebaseSignup } from "../lib/firebase";
import CustomToast from "./CustomToast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = ({ onSignupSuccess, onToggleLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setLoading(true);
      await firebaseSignup(
        email,
        password,
        username,
        location,
        emergencyContact,
        healthConditions
      );
      setSuccess(true);
      onSignupSuccess(); // Notify Home component of successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-green-600 text-3xl font-bold text-center mb-6">
        Signup
      </h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <form onSubmit={handleSignup} className="flex flex-col">
        <label htmlFor="username" className="mb-2 text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="p-3 border text-gray-700 rounded-md mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email" className="mb-2 text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="p-3 border text-gray-700 rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <label htmlFor="location" className="mb-2 text-gray-700">
          Location (Country)
        </label>
        <input
          type="text"
          id="location"
          className="p-3 border text-gray-700 rounded-md mb-4"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label htmlFor="emergencyContact" className="mb-2 text-gray-700">
          Emergency Contact
        </label>
        <PhoneInput
          country={"us"}
          value={emergencyContact}
          onChange={setEmergencyContact}
          containerClass="w-full"
          inputClass="p-3 border text-gray-700 rounded-md mb-4 w-full"
          required
        />

        <label htmlFor="healthConditions" className="mb-2 text-gray-700">
          Health Conditions
        </label>
        <textarea
          id="healthConditions"
          className="p-3 border text-gray-700 rounded-md mb-4"
          value={healthConditions}
          onChange={(e) => setHealthConditions(e.target.value)}
          placeholder="List any chronic conditions or allergies"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`p-3 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 cursor-pointer"
          } text-white rounded-md hover:bg-green-700 transition`}
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </form>

      <button
        onClick={onToggleLogin}
        className="text-green-600 underline text-center w-full mt-4"
      >
        Already have an account? Login here
      </button>

      <CustomToast
        title="Signup Successful!"
        description="Your account has been created."
        open={success}
        onOpenChange={setSuccess}
      />
    </div>
  );
};

export default Signup;
