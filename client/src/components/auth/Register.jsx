"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { register } from "@/modules/fetch-user";
import { useRouter } from "next/navigation";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");

    try {
      const data = { name, email, password };
      await register(data);

      alert("Register Success");
      router.push("/");
    } catch (error) {
      console.log(error.message);
      alert("register failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-8 shadow-md rounded-lg dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
        Register
      </h2>
      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-gray-600">
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <button
          type="button"
          onClick={toggleConfirmPasswordVisibility}
          className="absolute right-3 top-9 text-gray-600">
          {showConfirmPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 text-center mb-2">
          {errorMessage}
        </p>
      )}
      <Button text="Register" type="submit" className="mt-2" />
      <p className="text-black text-sm text-center mt-3">
        Already have an account?
        <a href="/auth/login" className="text-blue-600 ml-1">
          Login
        </a>
      </p>
    </form>
  );
};
