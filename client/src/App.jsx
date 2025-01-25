import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Login from "./pages/auth/login";
import Footer from "./pages/layout/Footer";
import NavbarLarge from "./pages/layout/NavbarLarge";
import HomePage from "./pages/component/Home";
import { useState } from "react";
import AboutMe from "./pages/component/AboutMe";
import NotFound from "./pages/not-found";
import CheckAuth from "./pages/common/CheckAuth";
import Unauthorized from "./pages/unauth-page";
import NavbarSmall from "./pages/layout/NavbarSmall";
import Photo from "./pages/component/Photo";
import Dashboard from "./pages/admin/Dashboard";
import UsersList from "./pages/admin/UserList";
import UpdateUser from "./pages/admin/UpdateUser";
import AdminContact from "./pages/admin/AdminGetInTouch";
import AdminPhoto from "./pages/admin/AdminPhoto";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminService from "./pages/admin/AdminService";
import AdminLogo from "./pages/admin/AdminLogo";
import AdminHomeAbout from "./pages/admin/AdminHomeAbout";
import AdminHomeContact from "./pages/admin/AdminHomeContact";
import PrivateRoute from "./protected-route";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UpdateProfile from "./pages/auth/UpdateProfile";
import UpdatePassword from "./pages/auth/UpdatePassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CreateUserForm from "./pages/admin/AdminCreateUserForm";

export default function App() {
  const [scrollToSection, setScrollToSection] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ToastContainer position="top-center" />
      <NavbarLarge setScrollToSection={setScrollToSection} />
      <NavbarSmall setScrollToSection={setScrollToSection} />
      <Routes>
        <Route
          path="/"
          element={<HomePage scrollToSection={scrollToSection} />}
        />
        <Route
          path="/admin-login"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Login />
            </CheckAuth>
          }
        />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route
          path="/me/update"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <PrivateRoute>
              <UpdateUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <PrivateRoute>
              <AdminContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/photo"
          element={
            <PrivateRoute>
              <AdminPhoto />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <PrivateRoute>
              <AdminAbout />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateRoute>
              <AdminService />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/logo"
          element={
            <PrivateRoute>
              <AdminLogo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/home/about"
          element={
            <PrivateRoute>
              <AdminHomeAbout />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/home/contact"
          element={
            <PrivateRoute>
              <AdminHomeContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create/user"
          element={
            <PrivateRoute>
              <CreateUserForm />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Footer />
    </div>
  );
}
