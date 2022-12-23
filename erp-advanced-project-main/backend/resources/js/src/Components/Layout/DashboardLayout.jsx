import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);
  return (
    auth && (
      <div>
        <Sidebar auth={auth} />
        <main className="content-container">
          <Navbar auth={auth} setAuth={setAuth} />
          <Outlet auth={auth} />
          <Footer />
        </main>
      </div>
    )
  );
};

export default DashboardLayout;
