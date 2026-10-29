import React, { useEffect, useState } from "react";
import {
    Heart,
    MapPin,
    Layers3,
    Thermometer,
    CloudRain,
    Droplets,
    Sun,
    Waves,
    Sprout,
    CalendarDays,
    Clock3,
    Scissors,
    PlayCircle,
    CheckCircle2,
    Info,
    PackageCheck,
    Trash2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";
import { useCrops } from "../../hooks/useCrops";
import { useSelector } from "react-redux";

const CropDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { savedCrops } = useSelector((state) => state.auth);

    const savedCropIds = new Set(
        savedCrops?.map((savedItem) => savedItem.crop?.id) || []
    );

    const { handleGetCropsById, handleRemoveSavedCrops, handleSaveCrops } = useCrops();

    const [crop, setCrop] = useState(null);
    const [cultivation, setCultivation] = useState(null);
    const [harvesting, setHarvesting] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const handleGetCrop = async () => {
        try {
            const crpData = await handleGetCropsById(id);

            setCrop(crpData.crop);
            setCultivation(crpData.cultivation || null);
            setHarvesting(crpData.harvesting || null);
        } catch (error) {
            console.error("Failed to fetch crop:", error);
        }
    };

    useEffect(() => {
        handleGetCrop();
    }, [id]);

    // Set saved state according to Redux
    useEffect(() => {
        if (crop?.id) {
            setIsSaved(savedCropIds.has(crop.id));
        }
    }, [crop?.id, savedCrops]);

    const handleSave = () => {
        setIsSaved((prev) => !prev);

        // Later connect this with your backend
        handleSaveCrops(crop.id);
    };

    const handleRemove = () => {
        setIsSaved((prev) => !prev);

        // Later connect this with your backend
        handleRemoveSavedCrops(crop.id);
    };

    if (!crop) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f9f5]">
                <p className="text-gray-500">Loading crop...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f9f5] px-5 py-8 md:px-10 lg:px-20">

            {/* ========================= */}
            {/* MAIN IMAGE SECTION */}
            {/* ========================= */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-5
                    rounded-3xl
                    bg-white
                    p-4
                    shadow-sm
                    md:p-6
                    lg:grid-cols-[100px_1fr]
                "
            >

                {/* Thumbnail Images */}
                <div
                    className="
                        order-2
                        flex
                        gap-4
                        overflow-x-auto
                        lg:order-1
                        lg:flex-col
                    "
                >
                    {crop.images?.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedImage(index)}
                            className={`
                                relative
                                h-24
                                w-24
                                shrink-0
                                overflow-hidden
                                rounded-2xl
                                border-2
                                transition-all
                                duration-200
                                ${
                                    selectedImage === index
                                        ? "border-[#39542c] ring-2 ring-[#39542c]/20"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                }
                            `}
                        >
                            <img
                                src={image.imageUrl}
                                alt={`${crop.name} ${index + 1}`}
                                className="h-full w-full object-cover"
                            />

                            {selectedImage === index && (
                                <div className="absolute inset-0 bg-[#39542c]/10" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Big Image */}
                <div
                    className="
                        relative
                        order-1
                        h-[420px]
                        overflow-hidden
                        rounded-2xl
                        bg-[#edf1e9]
                        lg:order-2
                        lg:h-[560px]
                    "
                >
                    {crop?.images?.length > 0 ? (
                        <img
                            src={crop.images[selectedImage]?.imageUrl}
                            alt={crop.name}
                            className="
                                h-full
                                w-full
                                object-cover
                                transition-all
                                duration-500
                            "
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                            No Image Available
                        </div>
                    )}

                    {/* Gradient */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/40
                            via-transparent
                            to-transparent
                        "
                    />

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className={`
                            absolute
                            right-5
                            top-5
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            shadow-lg
                            backdrop-blur-md
                            transition-all
                            hover:scale-110
                            ${
                                isSaved
                                    ? "bg-red-500 text-white"
                                    : "bg-white/90 text-gray-700 hover:text-red-500"
                            }
                        `}
                    >
                        <Heart
                            size={21}
                            fill={isSaved ? "currentColor" : "none"}
                        />
                    </button>

                    {/* Image Counter */}
                    <div
                        className="
                            absolute
                            bottom-5
                            right-5
                            rounded-full
                            bg-black/50
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-white
                            backdrop-blur-md
                        "
                    >
                        {selectedImage + 1} / {crop.images?.length || 0}
                    </div>
                </div>
            </div>

            {/* ========================= */}
            {/* CROP INFORMATION */}
            {/* ========================= */}

            <div className="mt-8">

                {/* Category */}
                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-[#e7f0e2]
                        px-4
                        py-1.5
                        text-sm
                        font-semibold
                        text-[#39542c]
                    "
                >
                    {crop.category}
                </span>

                {/* Name */}
                <div
                    className="
                        mt-3
                        flex
                        flex-col
                        gap-3
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >
                    <div>
                        <h1
                            className="
                                text-4xl
                                font-bold
                                tracking-tight
                                text-[#263b20]
                                md:text-5xl
                            "
                        >
                            {crop.name}
                        </h1>

                        <p className="mt-2 text-lg italic text-gray-500">
                            {crop.scientificName}
                        </p>
                    </div>

                    {/* Save Button */}
                    {
                        !isSaved &&
                        <button
                        onClick={handleSave}
                        className={`
                            flex
                            w-fit
                            items-center
                            gap-2
                            rounded-xl
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            transition
                            ${
                                isSaved
                                    ? "bg-red-50 text-red-600"
                                    : "bg-[#39542c] text-white hover:bg-[#2d4223]"
                            }
                        `}
                    >
                        <Heart
                            size={18}
                            fill={
                                isSaved
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        {isSaved
                            ? "Saved"
                            : "Save Crop"}
                    </button>
                    }


                    {/* Remove Button */}
                    {
                        isSaved &&
                        <button
                        onClick={handleRemove}
                        className={`
                            flex
                            w-fit
                            items-center
                            gap-2
                            rounded-xl
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            transition
                            ${
                                isSaved
                                    ? "bg-red-50 text-red-600"
                                    : "bg-[#39542c] text-white hover:bg-[#2d4223]"
                            }
                        `}
                    >
                        <Trash2
                            size={18}
                            fill={
                                isSaved
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        Remove
                    </button>
                    }
                </div>

                {/* Description */}
                <div className="mt-8 max-w-4xl">
                    <h2 className="text-xl font-bold text-[#263b20]">
                        About this crop
                    </h2>

                    <p className="mt-3 text-base leading-7 text-gray-600">
                        {crop.description}
                    </p>
                </div>

                {/* ========================= */}
                {/* GROWING REQUIREMENTS */}
                {/* ========================= */}

                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#263b20]">
                        Growing Requirements
                    </h2>

                    <div
                        className="
                            mt-5
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >
                        <DetailCard
                            icon={<MapPin size={21} />}
                            title="Origin"
                            value={crop.origin}
                        />

                        <DetailCard
                            icon={<Layers3 size={21} />}
                            title="Soil"
                            value={crop.soil}
                        />

                        <DetailCard
                            icon={<Thermometer size={21} />}
                            title="Temperature"
                            value={crop.temperature}
                        />

                        <DetailCard
                            icon={<CloudRain size={21} />}
                            title="Rainfall"
                            value={crop.rainfall}
                        />

                        <DetailCard
                            icon={<Droplets size={21} />}
                            title="Humidity"
                            value={crop.humidity}
                        />

                        <DetailCard
                            icon={<Sun size={21} />}
                            title="Sunlight"
                            value={crop.sunlight}
                        />

                        <DetailCard
                            icon={<Waves size={21} />}
                            title="Water Requirement"
                            value={crop.waterRequirement}
                        />

                        <DetailCard
                            icon={<Layers3 size={21} />}
                            title="Category"
                            value={crop.category}
                        />
                    </div>
                </div>

                {/* ================================================= */}
                {/* CULTIVATION SECTION */}
                {/* ================================================= */}

                {cultivation && (
                    <section className="mt-16">

                        {/* Section Heading */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#e7f0e2]
                                        text-[#39542c]
                                    "
                                >
                                    <Sprout size={24} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-[#263b20] md:text-3xl">
                                        Cultivation Guide
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Learn how to cultivate {crop.name} step by step.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ========================= */}
                        {/* CULTIVATION OVERVIEW */}
                        {/* ========================= */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-3
                            "
                        >
                            {/* Sowing */}
                            <CultivationInfoCard
                                icon={<CalendarDays size={22} />}
                                title="Sowing Time"
                                value={cultivation.showing_time}
                            />

                            {/* Growing Duration */}
                            <CultivationInfoCard
                                icon={<Clock3 size={22} />}
                                title="Growing Duration"
                                value={cultivation.growing_Duration}
                            />

                            {/* Harvesting */}
                            <CultivationInfoCard
                                icon={<Scissors size={22} />}
                                title="Harvesting Period"
                                value={cultivation.harvesting_Period}
                            />
                        </div>

                        {/* ========================= */}
                        {/* YOUTUBE TUTORIAL */}
                        {/* ========================= */}

                        {cultivation.youtube_url && (
                            <div
                                className="
                                    mt-6
                                    flex
                                    flex-col
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-[#e5eadf]
                                    bg-white
                                    p-5
                                    shadow-sm
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                            >
                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-red-50
                                            text-red-600
                                        "
                                    >
                                        {/* FIXED: Youtube -> PlayCircle */}
                                        <PlayCircle size={23} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#263b20]">
                                            Watch Cultivation Tutorial
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Learn more about cultivating this crop.
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={cultivation.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-red-600
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-red-700
                                    "
                                >
                                    {/* FIXED: Youtube -> PlayCircle */}
                                    <PlayCircle size={18} />
                                    Watch on YouTube
                                </a>
                            </div>
                        )}

                        {/* ========================= */}
                        {/* CULTIVATION STEPS */}
                        {/* ========================= */}

                        {cultivation.steps?.length > 0 && (
                            <div className="mt-10">

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-[#263b20]">
                                        Cultivation Steps
                                    </h3>

                                    <p className="mt-1 text-gray-500">
                                        Follow these steps for successful cultivation.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {cultivation.steps.map((step, index) => (
                                        <div
                                            key={step.id || index}
                                            className="
                                                relative
                                                overflow-hidden
                                                rounded-3xl
                                                border
                                                border-[#e5eadf]
                                                bg-white
                                                shadow-sm
                                                transition
                                                hover:shadow-md
                                            "
                                        >
                                            {/* Step Header */}
                                            <div className="flex items-start gap-4 p-6">

                                                {/* Step Number */}
                                                <div
                                                    className="
                                                        flex
                                                        h-12
                                                        w-12
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-2xl
                                                        bg-[#39542c]
                                                        text-lg
                                                        font-bold
                                                        text-white
                                                    "
                                                >
                                                    {step.stepNumber || index + 1}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6d8b60]">
                                                        Step {step.stepNumber || index + 1}
                                                    </p>

                                                    <h4 className="mt-1 text-xl font-bold text-[#263b20]">
                                                        {step.title}
                                                    </h4>

                                                    <p className="mt-2 leading-7 text-gray-600">
                                                        {step.description}
                                                    </p>

                                                </div>
                                            </div>

                                            {/* Step Content */}
                                            <div className="grid grid-cols-1 gap-6 border-t border-[#edf1e9] bg-[#fafcf9] p-6 md:grid-cols-2">

                                                {/* Recommended Practices */}
                                                {step.recommendedPractices?.length > 0 && (
                                                    <div>

                                                        <div className="mb-4 flex items-center gap-2">

                                                            <CheckCircle2
                                                                size={19}
                                                                className="text-[#39542c]"
                                                            />

                                                            <h5 className="font-semibold text-[#263b20]">
                                                                Recommended Practices
                                                            </h5>

                                                        </div>

                                                        <div className="space-y-3">
                                                            {step.recommendedPractices.map(
                                                                (practice, practiceIndex) => (
                                                                    <div
                                                                        key={practiceIndex}
                                                                        className="
                                                                            flex
                                                                            items-start
                                                                            gap-3
                                                                            rounded-xl
                                                                            bg-white
                                                                            p-3
                                                                            shadow-sm
                                                                        "
                                                                    >
                                                                        <span
                                                                            className="
                                                                                mt-1
                                                                                h-2
                                                                                w-2
                                                                                shrink-0
                                                                                rounded-full
                                                                                bg-[#4cbb17]
                                                                            "
                                                                        />

                                                                        <p className="text-sm leading-6 text-gray-600">
                                                                            {practice}
                                                                        </p>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>

                                                    </div>
                                                )}

                                                {/* Important Notes */}
                                                {step.importantNotes && (
                                                    <div>

                                                        <div className="mb-4 flex items-center gap-2">

                                                            <Info
                                                                size={19}
                                                                className="text-amber-600"
                                                            />

                                                            <h5 className="font-semibold text-[#263b20]">
                                                                Important Note
                                                            </h5>

                                                        </div>

                                                        <div
                                                            className="
                                                                rounded-2xl
                                                                border
                                                                border-amber-100
                                                                bg-amber-50
                                                                p-4
                                                            "
                                                        >
                                                            <p className="text-sm leading-6 text-amber-800">
                                                                {step.importantNotes}
                                                            </p>
                                                        </div>

                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}

                    </section>
                )}

                {/* ================================================= */}
                {/* HARVESTING SECTION */}
                {/* ================================================= */}

                <section className="mt-16">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                                <PackageCheck size={25} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#263b20] md:text-3xl">
                                    Harvesting Guide
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Learn when and how to harvest {crop.name}.
                                </p>
                            </div>
                        </div>
                    </div>

                    {!harvesting ? (
                        <div className="rounded-2xl border border-dashed border-[#dce6d5] bg-white p-8 text-center">
                            <PackageCheck className="mx-auto mb-3 text-amber-600" size={30} />
                            <h3 className="font-semibold text-[#263b20]">Harvesting guide not available</h3>
                            <p className="mt-1 text-sm text-gray-500">Harvesting information has not been added for this crop yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Harvesting time and method */}
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                            <Clock3 size={21} />
                                        </span>
                                        <h3 className="font-semibold text-slate-800">Harvesting Time</h3>
                                    </div>
                                    <p className="text-sm leading-7 text-slate-600">
                                        {harvesting.harvestingTime || "Not available"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                            <Scissors size={21} />
                                        </span>
                                        <h3 className="font-semibold text-slate-800">Harvesting Method</h3>
                                    </div>
                                    <p className="text-sm leading-7 text-slate-600">
                                        {harvesting.harvestingMethod || "Not available"}
                                    </p>
                                </div>
                            </div>

                            {/* Optional harvesting video */}
                            {harvesting.youtubeUrl && (
                                <a
                                    href={harvesting.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/60 p-5 transition hover:border-red-200 hover:bg-red-50 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                            <PlayCircle size={24} />
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">Watch Harvesting Video</h3>
                                            <p className="mt-1 text-sm text-slate-500">Watch the harvesting process for this crop.</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white">
                                        <PlayCircle size={17} /> Watch video
                                    </span>
                                </a>
                            )}

                            {/* Maturity indicators */}
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={21} className="text-[#39542c]" />
                                    <h3 className="text-lg font-bold text-[#263b20]">Maturity Indicators</h3>
                                </div>
                                {harvesting.maturityIndicators?.length ? (
                                    <div className="flex flex-wrap gap-3">
                                        {harvesting.maturityIndicators.map((indicator, index) => (
                                            <div key={`${indicator}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-slate-700">
                                                <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                                                <span>{indicator}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No maturity indicators added.</p>
                                )}
                            </div>

                            {/* Harvesting steps */}
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-[#263b20]">Harvesting Steps</h3>
                                    <p className="mt-1 text-sm text-gray-500">Follow these steps to harvest and handle produce carefully.</p>
                                </div>
                                {harvesting.steps?.length ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        {harvesting.steps.map((step, index) => (
                                            <article key={step.id || index} className="rounded-2xl border border-[#e5eadf] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                                <div className="mb-4 flex items-center gap-3">
                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#39542c] text-base font-bold text-white">
                                                        {step.stepNumber || index + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-[#6d8b60]">Step {step.stepNumber || index + 1}</span>
                                                </div>
                                                <h4 className="font-semibold leading-6 text-[#263b20]">{step.title || `Step ${index + 1}`}</h4>
                                                <p className="mt-2 text-sm leading-6 text-gray-600">{step.description || "No description available."}</p>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No harvesting steps added.</p>
                                )}
                            </div>

                            {/* Post-harvest handling */}
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <Sprout size={21} className="text-[#39542c]" />
                                    <h3 className="text-lg font-bold text-[#263b20]">Post-Harvest Handling</h3>
                                </div>
                                {harvesting.postHarvestHandling?.length ? (
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {harvesting.postHarvestHandling.map((instruction, index) => (
                                            <div key={`${instruction}-${index}`} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-white p-4">
                                                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-600" />
                                                <p className="text-sm leading-6 text-slate-600">{instruction}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No post-harvest handling instructions added.</p>
                                )}
                            </div>

                            {/* Storage instructions */}
                            <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                                    <Info size={21} />
                                </span>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Storage</h3>
                                    <p className="mt-1 text-sm leading-6 text-amber-900">
                                        {harvesting.storage || "Storage information not available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
};


/* ================================================= */
/* DETAIL CARD */
/* ================================================= */

const DetailCard = ({ icon, title, value }) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-[#e5eadf]
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
            "
        >
            <div
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#edf4e9]
                    text-[#39542c]
                "
            >
                {icon}
            </div>

            <p className="mt-4 text-sm font-medium text-gray-400">
                {title}
            </p>

            <p className="mt-1 text-sm font-semibold leading-6 text-[#263b20]">
                {value || "Not available"}
            </p>
        </div>
    );
};


/* ================================================= */
/* CULTIVATION INFO CARD */
/* ================================================= */

const CultivationInfoCard = ({ icon, title, value }) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-[#e5eadf]
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
            "
        >
            <div
                className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#edf4e9]
                    text-[#39542c]
                "
            >
                {icon}
            </div>

            <p className="mt-4 text-sm font-medium text-gray-400">
                {title}
            </p>

            <p className="mt-1 text-lg font-bold text-[#263b20]">
                {value || "Not available"}
            </p>
        </div>
    );
};

export default CropDetailsPage;