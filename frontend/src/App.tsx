import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./authStore";
import SecurityPage from "./pages/SecurityPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";

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
          <Route path="/dashboard" element={<Dashboard />} />
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