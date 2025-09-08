import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import StudentLayout from "./components/Client-view/ClientLayout";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
