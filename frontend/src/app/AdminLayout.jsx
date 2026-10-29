import React from "react";
import { Link, Outlet } from "react-router";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

            {/* Navbar */}
            <nav className="border-b border-green-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    {/* Logo */}
                    <Link
                        to="/admin"
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl text-white shadow-md">
                            🌱
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Farming Hub
                            </h1>
                            <p className="text-xs text-gray-500">
                                Admin Portal
                            </p>
                        </div>
                    </Link>

                    {/* Navbar Links */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/login"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                        >
                            Login
                        </Link>

                        <Link
                            to="/admin/register"
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </nav>


            {/* Hero Section */}
            <Outlet />

        </div>
    );
};

export default AdminLayout;
