import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function SecurityPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setIsAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate()

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError(null);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:3000/api/v1/agent/login",
        { password }
      );
      // Assuming the response contains a token or auth status
      console.log("Login success:", response.data.agent);
      setIsAuthenticated(true);
      // useAuthStore.getState().setIsAuthenticated(true);
      setUser(response.data.agent);
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gradinet-bd">
      <div className="flex flex-col gap-2">
        {
          error && <p className="text-center text-red-400">{error}</p>
        }
        <form
          className="flex bg-gray-300 rounded-md shadow-md p-[2px]"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-[#020024] text-white rounded-md p-2 focus:outline-none"
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
