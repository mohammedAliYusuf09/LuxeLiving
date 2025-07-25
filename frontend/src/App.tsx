import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./authStore";
import SecurityPage from "./pages/SecurityPage";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import Blogs from "./pages/Blogs";
import Propertys from "./pages/Propertys";
import Messages from "./pages/Messages";

function App() {
  const { getItemAuthWithExpiry } = useAuthStore();
  const isAuth = getItemAuthWithExpiry('setIsAuthenticated');

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/security"
        element={!isAuth ? <SecurityPage /> : <Navigate to="/" />}
      />

      {/* Protected Routes with Layout */}
      {isAuth && (
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/propertys" element={<Propertys />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more routes as needed */}
        </Route>
      )}

      {/* Fallback: redirect to /security if not logged in */}
      {!isAuth && (
        <Route path="*" element={<Navigate to="/security" />} />
      )}
    </Routes>
  );
}

export default App;