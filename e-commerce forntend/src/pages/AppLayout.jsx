import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
