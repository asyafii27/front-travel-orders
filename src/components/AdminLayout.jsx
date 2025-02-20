import Navbar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <Header />
        
      </div>
    </>
  );
};

export default AdminLayout;
