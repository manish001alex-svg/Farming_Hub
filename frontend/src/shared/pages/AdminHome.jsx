import { Link } from 'react-router'
import React from 'react'

const AdminHome = () => {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-16">

                <div className="grid w-full items-center gap-12 lg:grid-cols-2">

                    {/* Left Content */}
                    <div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            <span>🌾</span>
                            Farming Hub Administration
                        </div>

                        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Manage Farming
                            <span className="block text-green-600">
                                Smarter & Better
                            </span>
                        </h2>
                        
                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            Welcome to the Farming Hub Admin Portal. Manage crops,
                            farming information, cultivation practices and other
                            agricultural resources from one place.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/admin/login"
                                className="rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
                            >
                                Login as Admin
                            </Link>

                            <Link
                                to="/admin/register"
                                className="rounded-xl border border-green-200 bg-white px-6 py-3.5 font-semibold text-green-700 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50"
                            >
                                Create Admin Account
                            </Link>

                        </div>

                    </div>


                    {/* Right Card */}
                    <div className="relative">

                        {/* Background decoration */}
                        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-green-200/50 blur-3xl"></div>
                        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-emerald-200/50 blur-3xl"></div>

                        <div className="relative rounded-3xl border border-green-100 bg-white p-8 shadow-2xl shadow-green-900/10">

                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Admin Portal
                                    </p>

                                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                                        Welcome Back 👋
                                    </h3>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    🌱
                                </div>
                            </div>


                            {/* Features */}
                            <div className="space-y-4">

                                <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-600 text-xl text-white">
                                        🌾
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Manage Crops
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Add and manage crop information
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4 rounded-xl bg-emerald-50 p-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xl text-white">
                                        📋
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Farming Information
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Maintain cultivation practices
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4 rounded-xl bg-lime-50 p-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-lime-600 text-xl text-white">
                                        📊
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Manage Resources
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Keep agricultural data organized
                                        </p>
                                    </div>
                                </div>

                            </div>


                            {/* Bottom */}
                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <p className="text-center text-sm text-gray-500">
                                    Already have an admin account?
                                </p>

                                <Link
                                    to="/admin/login"
                                    className="mt-3 block text-center font-semibold text-green-600 hover:text-green-700"
                                >
                                    Login to Admin Portal →
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
  )
}

export default AdminHome