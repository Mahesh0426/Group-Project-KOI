import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import StudentLayout from "./components/Client-view/ClientLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
