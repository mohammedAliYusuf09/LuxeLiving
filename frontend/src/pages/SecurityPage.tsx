import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../authStore";

function SecurityPage() {
  const [password, setPassword] = useState("");

  const { setIsAuthenticated, setUser, setItemAuthWithExpiry }= useAuthStore();

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:3000/api/v1/agent/login", { password });
      // Assuming the response contains a token or auth status
      console.log("Login success:", response.data.agent);

      // Example: update Zustand or redirect
      setItemAuthWithExpiry('setIsAuthenticated', true, 3600000 * 24);
      setIsAuthenticated(true);
      // useAuthStore.getState().setIsAuthenticated(true);
      setUser(response.data.agent)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
      } else if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-2">
        <p className="text-center text-red-400">Password is incorrect</p>
        <form
          className="flex bg-yellow-50 rounded-md shadow-md p-[2px]"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-[#171821] text-white rounded-md p-2 focus:outline-none"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="text-stone-900 px-2 cursor-pointer hover:bg-amber-200 transition-colors ease-in duration-200"
          >
            <FaArrowRight />
          </button>
        </form>
        <p className="text-right text-gray-300 cursor-pointer hover:text-white transition-colors ease-in duration-200">
          Forget Password?
        </p>
      </div>
    </div>
  );
}

export default SecurityPage;
