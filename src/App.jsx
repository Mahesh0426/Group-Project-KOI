import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import StudentLayout from "./components/Client-view/ClientLayout";
import AboutUsPage from "./pages/AboutUsPage";
import ProgramsPage from "./pages/ProgramsPage";
import GallaryPage from "./pages/GallaryPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<GallaryPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/auth" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
