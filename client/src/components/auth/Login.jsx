"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import Image from "next/image";
import priorityImage from "../../assets/todo.jpeg";
import { login } from "@/modules/fetch-user";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = await login({
        email: email,
        password: password,
      });

      const token = loginUser.accessToken;
      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");
      
      router.push("/my-day");
    } catch (error) {
      console.error("Login failed", error.message);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full grid grid-cols-2">
        <div className="text-center w-full flex flex-col justify-center items-center">
          <h1 className="mb-5 font-semibold text-3xl">
            Welcome to Priority App
          </h1>
          <p className="text-md">
            Stay focused and achieve more with Priority.
            <br /> Organize tasks, set priorities, and manage your day
            effortlessly in a sleek, modern app. <br /> Get things done,
            stress-free!
          </p>
          <div className="relative w-full h-64 mt-8">
            <Image
              src={priorityImage}
              alt="priority"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto bg-white p-8 shadow-md rounded-lg dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Login
          </h2>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <div className="relative">
            <Input
              id="password"
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
          <Button text="Login" type="submit" className={"mt-3"} />
          <p className="text-black text-sm mt-5 text-center">
            Don't have account?{" "}
            <a href="/auth/register" className="text-blue-600">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
