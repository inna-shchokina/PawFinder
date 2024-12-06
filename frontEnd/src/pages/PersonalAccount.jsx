import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";

export default function PersonalAccount() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen mx-auto max-w-[1440px] px-10">
      <AccountSidebar />
      <div className="flex-1 flex flex-col max-w-[1200px] w-full">
        <Outlet />
      </div>
    </div>
  );
}
