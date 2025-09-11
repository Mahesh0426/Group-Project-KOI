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

function App() {
  return (
    <>
      <Routes>
        {/* admin layout */}
        {/* private Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="programs" element={<AdminProgramsPage />} />
          <Route path="create-program" element={<CreateProgramFormPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="create-users" element={<CreateUsersFormPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>

        {/* public Routes */}
        {/* StudentLayout */}
        <Route path="/" element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<GallaryPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
