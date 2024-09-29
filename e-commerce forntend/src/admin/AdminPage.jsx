import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdPreview } from "react-icons/md";
import { FaJediOrder } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateProduct from "../pages/CreateProduct";
import ViewProduct from "./ViewProduct";
import ViewOrder from "./ViewOrder";
import ViewUser from "./ViewUser";
import AddAdmin from "./AddAdmin";

const AdminPage = () => {
  const [activePage, setActivePage] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/admin/${page}`);
  };

  const renderButtons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 mt-14 text-center p-36">
      <div
        className="flex flex-col justify-center items-center text-center shadow-lg p-4 aspect-w-1 aspect-h-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleNavigation("addproduct")}
      >
        <IoAddCircleSharp size={45} />
        <h2 className="mt-5">Add Product</h2>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center shadow-lg p-4 aspect-w-1 aspect-h-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleNavigation("category")}
      >
        <IoMdAdd size={45} />
        <h2 className="mt-5">Category</h2>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center shadow-lg p-4 aspect-w-1 aspect-h-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleNavigation("viewproduct")}
      >
        <MdPreview size={45} />
        <h2 className="mt-5">View Product</h2>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center shadow-lg p-4 aspect-w-1 aspect-h-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleNavigation("vieworder")}
      >
        <FaJediOrder size={45} />
        <h2 className="mt-5">Orders</h2>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center shadow-lg p-4 aspect-w-1 aspect-h-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleNavigation("viewuser")}
      >
        <IoIosPersonAdd size={45} />
        <h2 className="mt-5">User</h2>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center shadow-lg p-4 aspect-w-1 aspect-h-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleNavigation("addadmin")}
      >
        <IoPersonAddOutline size={45} />
        <h2 className="mt-5">Add Admin</h2>
      </div>
    </div>
  );

  const renderActivePage = () => {
    switch (activePage) {
      case "addproduct":
        return <CreateProduct />;

      case "viewproduct":
        return <ViewProduct />;
      case "vieworder":
        return <ViewOrder />;
      case "viewuser":
        return <ViewUser />;
      case "addadmin":
        return <AddAdmin />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    setActivePage(null);
    navigate("/admin");
  };

  return (
    <div>
      {activePage ? (
        <div>
          <button onClick={handleBack} className="mb-4 text-blue-500">
            Back to Admin Options
          </button>
          {renderActivePage()}
        </div>
      ) : (
        renderButtons()
      )}
    </div>
  );
};

export default AdminPage;
