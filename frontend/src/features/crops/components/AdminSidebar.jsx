import React from 'react'

import {
  LayoutDashboard,
  Sprout,
  Plus,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <>
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[286px] flex-col bg-gradient-to-b from-emerald-950 to-emerald-900 text-white">

        {/* Logo */}
        <div className="flex h-[92px] items-center gap-4 px-8">
          <div className="relative">
            <Sprout size={30} strokeWidth={1.8} />
          </div>

          <h1 className="text-[20px] font-bold tracking-tight">
            Farming Hub
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-3">

          {/* Dashboard */}
          <button className="flex w-full items-center gap-5 rounded-lg px-5 py-3 text-[15px] font-medium text-white/90 transition hover:bg-emerald-800">
            <LayoutDashboard size={20} strokeWidth={2} />
            <span>Dashboard</span>
          </button>

          {/* Crops Active */}
          <div className="mt-2">
            <button className="flex w-full items-center gap-5 rounded-lg bg-emerald-600 px-5 py-3 text-[15px] font-semibold shadow-sm">
              <Sprout size={20} strokeWidth={2} />
              <span>Crops</span>
            </button>

            {/* Sub Navigation */}
            <div className="ml-10 mt-2 space-y-1">
              <button className="flex w-full items-center gap-4 rounded-md px-3 py-2.5 text-[15px] font-medium text-white">
                <span className="h-2 w-2 rounded-full bg-white" />
                List Crops
              </button>

              <button className="flex w-full items-center gap-4 rounded-md px-3 py-2.5 text-[15px] text-white/90 transition hover:text-white">
                <Plus size={20} />
                <span>Add New Crop</span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <button className="mt-8 flex w-full items-center gap-5 rounded-lg px-5 py-3 text-[15px] font-medium text-white/90 transition hover:bg-emerald-800">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar