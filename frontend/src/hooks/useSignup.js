import React from "react";
import { useState } from "react";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (
    fullName,
    username,
    password,
    confirmPassword,
    gender
  ) => {
    const success = handleInputErrors(
      fullName,
      username,
      password,
      confirmPassword
    );
    if (!success) return;
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      toast.error("An error occurred. Please try again: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors(fullName, username, password, confirmPassword) {
  if (!fullName || !username || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  toast.success("Account created successfully");
  return true;
}
