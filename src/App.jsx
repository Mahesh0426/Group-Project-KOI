import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import StudentLayout from "./components/Client-view/ClientLayout";
import AboutUsPage from "./pages/AboutUsPage";
import ProgramsPage from "./pages/ProgramsPage";
import GallaryPage from "./pages/GallaryPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/auth/LoginPage";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProgramsPage from "./pages/admin/AdminProgramsPage";
import UsersPage from "./pages/admin/UsersPage";
import SettingPage from "./pages/admin/SettingPage";
import AdminLayout from "./components/Admin-view/AdminLayout";
import CreateProgramFormPage from "./pages/admin/CreateProgramFormPage";
import CreateUsersFormPage from "./pages/admin/CreateUsersFormPage";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import UnauthorizedPage from "./pages/pageNotFound/UnauthorizedPage";
import RouteGuard from "./components/Protected-Route/RouteGuard";
import MyProgramPage from "./pages/user/MyProgramPage";
import MyProfilePage from "./pages/user/MyProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* admin layout */}
        {/* private Routes */}
        <Route
          path="/admin/*"
          element={
            <RouteGuard>
              <AdminLayout />
            </RouteGuard>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="programs" element={<AdminProgramsPage />} />
          <Route path="create-program" element={<CreateProgramFormPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="create-users" element={<CreateUsersFormPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>

        {/* StudentLayout */}
        <Route path="/" element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<GallaryPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/my-program" element={<MyProgramPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
