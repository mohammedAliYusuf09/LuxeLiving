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
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/protected"
        // element={!isAuthenticated ? <SecurityPage /> : <Navigate to="/" />}
        element={ <ProtectedRoute/>}
      />

      <Route
        path="/security"
        // element={!isAuthenticated ? <SecurityPage /> : <Navigate to="/" />}
        element={ <SecurityPage/>}
      />

      {/* Protected Routes with Layout */}
      {isAuthenticated && (
        <Route element={<Layout />}>
          <Route index element={<Propertys />} />
          <Route path="/propertys" element={<Propertys />} />
          <Route path="/propertys/:id" element={<PropertyDetails />}/>
          <Route path="/propertys/add-property" element={<AddProperty />} />
          <Route path="/propertys/edit-property/:id" element={<EditProperty/>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add-blog" element={<AddBlog />} />
          <Route path="/blogs/details/:id" element={<BlogDetails />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more routes as needed */}
        </Route>
      )}

      {/* Fallback: redirect to /security if not logged in */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/protected" />} />
      )}
    </Routes>
  );
}

export default App;