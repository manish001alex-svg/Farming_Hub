import React, { useEffect, useState } from 'react'
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

const AdminItemList = () => {

    const [search, setSearch] = useState("");
    const { handleGetAllCrops } = useCrops();
    const [cropsX, setCropsX] = useState([]);

    const [getPageNo, setPageNo] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const filteredCrops = cropsX.filter((crop) =>
        `${crop.name} ${crop.scientificName} ${crop.category}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleGetCrops = async () => {
        const crpData = await handleGetAllCrops(getPageNo, 2);
        setCropsX(crpData.content);
        setTotalPage(crpData.totalPages);

        console.log("Total: ", totalPage);
    }

    const handleIncrement = (e) => {
        if (getPageNo < totalPage - 1)
            setPageNo((prev) => {
                return prev + 1;
            })
    }

    const handleDecrement = (e) => {

        if (getPageNo > 0)
            setPageNo((prev) => {
                return prev - 1;
            })
    }


    useEffect(() => {
        handleGetCrops();
    }, [getPageNo]);

    return (
        <main className="px-8 py-9 lg:px-10">

            {/* Page Heading */}
            <div className="mb-8 flex items-start justify-between">

                <div className="flex items-start gap-4">

                    <Sprout
                        size={40}
                        className="mt-1 text-emerald-600"
                        strokeWidth={1.7}
                    />

                    <div>
                        <h2 className="text-[30px] font-bold leading-none tracking-tight text-slate-950">
                            Crops
                        </h2>

                        <p className="mt-3 text-[15px] text-slate-500">
                            Manage your uploaded crops. You can view, add or delete
                            crops from here.
                        </p>
                    </div>
                </div>

                {/* Add Crop */}
                <button
                    className="
                flex items-center gap-3
                rounded-lg
                bg-emerald-700
                px-7 py-3
                text-[16px] font-semibold text-white
                shadow-sm
                transition
                hover:bg-emerald-800
              "
                >
                    <Plus size={24} />
                    Add New Crop
                </button>
            </div>

            {/* ================= CARD ================= */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">

                {/* Search */}
                <div className="relative mb-6">
                    <Search
                        size={20}
                        className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
                    />

                    <input
                        type="text"
                        placeholder="Search crops..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                  h-[51px]
                  w-full
                  rounded-lg
                  border border-slate-200
                  bg-slate-50
                  pl-12 pr-5
                  text-[15px]
                  text-slate-700
                  outline-none
                  placeholder:text-slate-500
                  focus:border-emerald-500
                  focus:ring-2
                  focus:ring-emerald-100
                "
                    />
                </div>

                {/* ================= TABLE ================= */}
                <div className="overflow-hidden rounded-lg border border-slate-200">

                    {/* Header */}
                    <div className="grid grid-cols-[185px_1.3fr_1fr_1.2fr] items-center border-b border-slate-200 bg-slate-50 px-5 py-5">

                        <div className="text-[12px] font-bold tracking-wide text-slate-500">
                            IMAGE
                        </div>

                        <div className="text-[12px] font-bold tracking-wide text-slate-500">
                            NAME
                        </div>

                        <div className="text-[12px] font-bold tracking-wide text-slate-500">
                            CATEGORY
                        </div>

                        <div className="text-[12px] font-bold tracking-wide text-slate-500">
                            ACTION
                        </div>
                    </div>

                    {/* Rows */}
                    {cropsX && cropsX.map((crop) => (
                        <CropsList crop={crop} />
                    ))}

                    {/* No result */}
                    {filteredCrops.length === 0 && (
                        <div className="py-16 text-center text-slate-500">
                            No crops found.
                        </div>
                    )}
                </div>

                {/* ================= FOOTER ================= */}
                <div className="mt-5 flex items-center justify-between">

                    <p className="text-[15px] text-slate-500">
                        Showing{" "}
                        <span className="font-medium text-slate-700">
                            {getPageNo}
                        </span>{" "}
                        -{" "}
                        <span className="font-medium text-slate-700">
                            {totalPage - 1}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-slate-700">
                            {cropsX.length}
                        </span>{" "}
                        crops
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-400
                    hover:bg-slate-50
                  "
                            disabled={getPageNo <= 0}
                            onClick={handleDecrement}
                        >
                            <ChevronLeft size={21} />
                        </button>

                        <button
                            className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-emerald-700
                    text-[15px]
                    font-semibold
                    text-white
                  "
                        >
                            {getPageNo}
                        </button>

                        <button
                            className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-500
                    hover:bg-slate-50
                  "
                            onClick={handleIncrement}
                        >
                            <ChevronRight size={21} />
                        </button>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminItemList