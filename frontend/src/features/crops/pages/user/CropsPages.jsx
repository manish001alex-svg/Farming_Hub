import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useCrops } from "../../hooks/useCrops";
import CropsCard from "../../components/CropsCard";
import { useSelector } from "react-redux";

const categories = [
    "Cereal",
    "Pulse",
    "Oilseed",
    "Vegetable",
    "Fruit",
    "Tuber",
    "Root Crop",
    "Fiber",
    "Sugar Crop",
    "Spice",
    "Beverage",
    "Medicinal",
    "Fodder",
    "Flower",
    "Nut",
    "Remove"
];

const CropsPages = () => {
    const [crops, setCrops] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const { savedCrops } = useSelector(state => state.auth);
    const savedCropIds = new Set(
        savedCrops?.map((savedItem) => savedItem.crop?.id) || []
    );

    const { handleGetAllCrops, handleSaveCrops, handleRemoveSavedCrops } = useCrops();
    const navigate = useNavigate();

    const visibleCategories = categories.slice(0, 6);

    const handleGetCrops = async () => {
        try {
            const cropData = await handleGetAllCrops(pageNo, 6);

            setCrops(cropData?.content || []);
            setTotalPages(cropData?.totalPages || 0);
        } catch (error) {
            console.error("Failed to fetch crops:", error);
            setCrops([]);
        }
    };

    useEffect(() => {
        handleGetCrops();
    }, [pageNo]);

    const filteredCrops = crops.filter((crop) => {
        const matchesCategory =
            selectedCategory === "All" ||
            crop.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
            crop.name?.toLowerCase().includes(search.toLowerCase()) ||
            crop.scientificName?.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPageNo(0);
    };

    return (
        <div className="min-h-screen bg-[#f7f9f5] px-6 py-10 md:px-12 lg:px-20">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#263b20]">
                    Explore Crops
                </h1>

                <p className="mt-2 text-gray-600">
                    Discover crops and learn about their cultivation, soil,
                    climate and farming requirements.
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-6 max-w-2xl">
                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search crops by name or scientific name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
            w-full rounded-xl border border-gray-200
            bg-white py-3 pl-12 pr-4
            outline-none transition
            focus:border-[#39542c]
            focus:ring-2 focus:ring-[#39542c]/20
          "
                />
            </div>

            {/* Categories */}
            <div className="mb-8 flex flex-wrap gap-3">

                <button
                    onClick={() => handleCategoryChange("All")}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition ${selectedCategory === "All"
                        ? "bg-[#39542c] text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    All
                </button>

                {visibleCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition ${selectedCategory === category
                            ? "bg-[#39542c] text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {category}
                    </button>
                ))}

                {/* More */}
                <button
                    className="
            rounded-full border border-gray-200
            bg-white px-5 py-2
            text-sm font-medium text-gray-600
            hover:bg-gray-100
          "
                >
                    More
                </button>
            </div>

            {/* Result information */}
            <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {selectedCategory === "All"
                        ? "All Crops"
                        : `${selectedCategory} Crops`}
                </p>

                <p className="text-sm text-gray-500">
                    {filteredCrops.length} crops
                </p>
            </div>

            {/* Crop Cards */}
            {filteredCrops.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {filteredCrops.map((crop) => (
                        <CropsCard
                            key={crop.id}
                            crop={crop}
                            isSaved={savedCropIds.has(crop.id)}
                            handleSaveCrops={handleSaveCrops}
                            handleRemoveCrop={handleRemoveSavedCrops}
                        />
                    ))}

                </div>
            ) : (
                /* Empty state */
                <div className="
          rounded-2xl bg-white
          px-6 py-20
          text-center shadow-sm
        ">
                    <h2 className="text-xl font-semibold text-gray-700">
                        No crops found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Try another crop name or category.
                    </p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">

                    {/* Previous */}
                    <button
                        disabled={pageNo === 0}
                        onClick={() => setPageNo((prev) => prev - 1)}
                        className="
              flex h-10 w-10 items-center justify-center
              rounded-lg border border-gray-200
              bg-white text-gray-600
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Pages */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setPageNo(index)}
                            className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition ${pageNo === index
                                ? "bg-[#39542c] text-white"
                                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        disabled={pageNo === totalPages - 1}
                        onClick={() => setPageNo((prev) => prev + 1)}
                        className="
              flex h-10 w-10 items-center justify-center
              rounded-lg border border-gray-200
              bg-white text-gray-600
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
                    >
                        <ChevronRight size={18} />
                    </button>

                </div>
            )}

        </div>
    );
};

export default CropsPages;