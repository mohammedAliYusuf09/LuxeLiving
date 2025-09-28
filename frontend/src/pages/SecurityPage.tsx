import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function SecurityPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setIsAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:3000/api/v1/agent/login",
        { password }
      );
      setIsAuthenticated(true);
      // useAuthStore.getState().setIsAuthenticated(true);
      setUser(response.data.agent);
      setLoading(false);
      navigate("/");
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gradinet-bd">
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {error && <p className="text-center text-red-400">{error}</p>}
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
      )}
    </div>
  );
}

export default SecurityPage;
