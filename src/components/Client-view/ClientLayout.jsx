import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";

const StudentLayout = () => {
  return (
    <div>
      <Header />

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default StudentLayout;
