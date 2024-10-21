import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="flex flex-col max-w-[74rem] h-[calc(100vh-10rem)] my-20 mx-auto p-10 bg-gray-80 rounded-lg">
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
