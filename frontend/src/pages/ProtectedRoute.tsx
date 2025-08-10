import type { User } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute() {
  //   const isLoggedIn = window.localStorage.getItem("loggedIn");
  //   return isLoggedIn==="true"?<Outlet/>:<Navigate to="login"/>;

  interface LogdinProp {
    success: boolean;
    message: string;
    user: User;
  }

  interface LogdinErroProp {
    success: boolean;
    message: string;
  }

  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!isAuthenticated) {
        try {
          axios.defaults.withCredentials = true;
          const { data } = await axios.get<LogdinProp | LogdinErroProp>(
            "http://localhost:3000/api/v1/agent/is-logedin"
          );
          console.log(data);
          if(data.success){
            setIsAuthenticated(data.success);
            // Only set user if `user` exists
            if ("user" in data) {
                setUser(data.user);
            }
            navigate('/')
          }else{
            navigate('/security')
          }
        } catch (error: unknown) {
          console.error("Error checking login status:", error);
          navigate('/security')
        }
      }
    };

    checkLoginStatus();
  }, [isAuthenticated, setIsAuthenticated, setUser, navigate]);

  return <div className="h-[100vh] w-[100vw] flex items-center justify-center">
    <h2 className="text-2xl">Loading...</h2>
  </div>
}

export default ProtectedRoute;
