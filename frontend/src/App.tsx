import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import SecurityPage from "./pages/SecurityPage";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import Blogs from "./pages/Blogs";
import Propertys from "./pages/Propertys";
import Messages from "./pages/Messages";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import EditProperty from "./pages/EditProperty";
import AddBlog from "./pages/AddBlog";

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
          <Route index element={<Propertys />} />
          <Route path="/propertys" element={<Propertys />} />
          <Route path="/propertys/:id" element={<PropertyDetails />}/>
          <Route path="/propertys/add-property" element={<AddProperty />} />
          <Route path="/propertys/edit-property/:id" element={<EditProperty/>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add-blog" element={<AddBlog />} />
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