"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axios from "axios"; 
import { cn } from "@/lib/utils";

function LoginCard({ className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const user = response.data;
        setUser(user);
        router.push("/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center dark:bg-gray-950",
        className,
      )}
    >
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-bold dark:text-gray-200">
          Welcome
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mb-4 flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:outline-none focus:ring-indigo-500"
                checked
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div> */}
            <a
              href="#"
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Account
            </a>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
