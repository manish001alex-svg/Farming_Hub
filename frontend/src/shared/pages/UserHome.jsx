import React from "react";
import { Link } from "react-router";
import Nav from "../components/Nav";

const UserHome = () => {
    return (
        <div className="w-full bg-white text-gray-900">

            {/* Navbar already exists */}
            <Nav />

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">

                <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

                    {/* Hero Content */}
                    <div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            🌱 Agriculture Knowledge Platform
                        </div>

                        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
                            Learn Farming.
                            <span className="block text-green-600">
                                Grow Smarter.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                            Farming Hub helps you discover useful information about
                            crops, cultivation, harvesting, farming methods and
                            agricultural practices — all in one place.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/crops"
                                className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
                            >
                                Explore Crops →
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl border border-green-200 bg-white px-7 py-3.5 font-semibold text-green-700 transition hover:bg-green-50"
                            >
                                Create Account
                            </Link>

                        </div>

                    </div>


                    {/* Hero Illustration */}
                    <div className="relative">

                        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-green-200/40 blur-3xl"></div>

                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl"></div>

                        <div className="relative rounded-3xl border border-green-100 bg-white p-8 shadow-2xl shadow-green-900/10">

                            <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 p-8 text-white">

                                <div className="text-7xl">
                                    🌾
                                </div>

                                <h2 className="mt-6 text-3xl font-bold">
                                    Farming Knowledge
                                </h2>

                                <p className="mt-3 leading-7 text-green-50">
                                    Discover the right information for growing,
                                    cultivating and harvesting crops effectively.
                                </p>

                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">

                                <div className="rounded-xl bg-green-50 p-4 text-center">
                                    <div className="text-2xl">🌱</div>
                                    <p className="mt-2 text-xs font-semibold text-gray-700">
                                        Cultivation
                                    </p>
                                </div>

                                <div className="rounded-xl bg-emerald-50 p-4 text-center">
                                    <div className="text-2xl">🌾</div>
                                    <p className="mt-2 text-xs font-semibold text-gray-700">
                                        Harvesting
                                    </p>
                                </div>

                                <div className="rounded-xl bg-lime-50 p-4 text-center">
                                    <div className="text-2xl">📚</div>
                                    <p className="mt-2 text-xs font-semibold text-gray-700">
                                        Learning
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* ================= ABOUT SECTION ================= */}
            <section className="bg-white py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="text-sm font-bold uppercase tracking-wider text-green-600">
                            About Farming Hub
                        </span>

                        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                            Everything You Need to Learn About Farming
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-gray-600">
                            Farming Hub is designed to make agricultural knowledge
                            easier to discover and understand. Explore crops and
                            learn about their cultivation, farming requirements,
                            harvesting and recommended practices.
                        </p>

                    </div>


                    {/* Feature Cards */}
                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {/* Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl">
                                🌱
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Crop Knowledge
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Discover information about different crops,
                                their requirements and farming characteristics.
                            </p>

                        </div>


                        {/* Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-3xl">
                                🚜
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Cultivation
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Learn about cultivation processes and recommended
                                farming methods for different crops.
                            </p>

                        </div>


                        {/* Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-lime-100 text-3xl">
                                🌾
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Harvesting
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Understand harvesting practices and learn how
                                crops can be managed throughout their growth.
                            </p>

                        </div>


                        {/* Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-3xl">
                                📖
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Learn Farming
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Build your farming knowledge with easy-to-find
                                information and practical guidance.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section className="bg-gray-50 py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="text-center">

                        <span className="text-sm font-bold uppercase tracking-wider text-green-600">
                            How It Works
                        </span>

                        <h2 className="mt-3 text-4xl font-bold">
                            Start Learning in Three Simple Steps
                        </h2>

                    </div>


                    <div className="mt-16 grid gap-10 md:grid-cols-3">

                        <div className="text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                                01
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Search
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Search for the crop or farming information
                                you want to learn about.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                                02
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Learn
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Explore cultivation, soil, temperature,
                                harvesting and farming information.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                                03
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Save
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Create an account and save useful crops and
                                information for quick access later.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SEARCH SECTION ================= */}
            <section className="bg-white py-24">

                <div className="mx-auto max-w-6xl px-6">

                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 px-8 py-16 text-center text-white shadow-xl md:px-16">

                        <div className="mx-auto max-w-3xl">

                            <div className="text-5xl">
                                🔎
                            </div>

                            <h2 className="mt-6 text-4xl font-bold">
                                Find Farming Information Quickly
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-green-50">
                                Looking for information about a particular crop?
                                Search Farming Hub and discover useful farming
                                information without going through complicated
                                resources.
                            </p>

                            <Link
                                to="/crops"
                                className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-green-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
                            >
                                Explore & Search Crops →
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SAVE SECTION ================= */}
            <section className="bg-green-50 py-24">

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

                    <div>

                        <span className="text-sm font-bold uppercase tracking-wider text-green-600">
                            Personalize Your Experience
                        </span>

                        <h2 className="mt-3 text-4xl font-bold leading-tight">
                            Save the Farming Information You Find Useful
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Create your Farming Hub account to save crops and
                            farming information that you want to revisit later.
                            Keep useful agricultural knowledge organized in one
                            place.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/register"
                                className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white transition hover:bg-green-700"
                            >
                                Create Free Account
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-xl border border-green-200 bg-white px-7 py-3.5 font-semibold text-green-700 transition hover:bg-green-100"
                            >
                                Login
                            </Link>

                        </div>

                    </div>


                    <div className="rounded-3xl bg-white p-8 shadow-xl">

                        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                ❤️
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    Saved Crops
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Your farming collection
                                </p>
                            </div>

                        </div>


                        <div className="mt-6 space-y-4">

                            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">

                                <div className="flex items-center gap-3">

                                    <span className="text-2xl">
                                        🌾
                                    </span>

                                    <div>
                                        <p className="font-semibold">
                                            Rice
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Cereal Crop
                                        </p>
                                    </div>

                                </div>

                                <span className="text-red-500">
                                    ♥
                                </span>

                            </div>


                            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">

                                <div className="flex items-center gap-3">

                                    <span className="text-2xl">
                                        🌽
                                    </span>

                                    <div>
                                        <p className="font-semibold">
                                            Maize
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Cereal Crop
                                        </p>
                                    </div>

                                </div>

                                <span className="text-red-500">
                                    ♥
                                </span>

                            </div>


                            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">

                                <div className="flex items-center gap-3">

                                    <span className="text-2xl">
                                        🥔
                                    </span>

                                    <div>
                                        <p className="font-semibold">
                                            Potato
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Root Crop
                                        </p>
                                    </div>

                                </div>

                                <span className="text-red-500">
                                    ♥
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FINAL CTA ================= */}
            <section className="bg-white py-24">

                <div className="mx-auto max-w-4xl px-6 text-center">

                    <div className="text-5xl">
                        🌱
                    </div>

                    <h2 className="mt-6 text-4xl font-extrabold">
                        Start Your Farming Journey
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Explore crops, learn cultivation and harvesting,
                        discover farming practices and save the information
                        that matters to you.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                        <Link
                            to="/crops"
                            className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-green-700"
                        >
                            Explore Farming Hub
                        </Link>

                        <Link
                            to="/register"
                            className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Sign Up
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="border-t border-gray-100 bg-gray-50">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">

                    <div>
                        <p className="font-bold text-gray-900">
                            🌱 Farming Hub
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Learn. Explore. Grow.
                        </p>
                    </div>

                    <p className="text-sm text-gray-500">
                        © 2026 Farming Hub. All rights reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
};

export default UserHome;