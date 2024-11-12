import axios from "axios";

export const signup = async (username, email, password) => {
  const formData = { username, email, password };

  try {
    const response = await axios.post("/api/auth/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Check for response errors from the API
    const message =
      error.response?.data?.message ||
      error.message ||
      "Signup failed due to an unknown error.";
    console.error("Signup error:", message);
    throw new Error(message);
  }
};
