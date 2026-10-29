import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Sprout,
  Plus,
  LogOut,
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardHeading from "../../components/DashboardHeading";
import { useCrops } from "../../hooks/useCrops";
import CropsList from "../../components/CropsList";
import AdminItemList from "./AdminItemList";
import CropCreationPage from "./CropCreationPage";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================ Side Bar ==================== */}
      <AdminSidebar />

      {/* ================= MAIN AREA ================= */}
      <div className="ml-[286px] min-h-screen">
        <DashboardHeading />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;