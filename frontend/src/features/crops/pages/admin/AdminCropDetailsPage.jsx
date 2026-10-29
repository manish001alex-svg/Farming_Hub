
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
    ArrowLeft,
    ArrowLeftCircle,
    ArrowRightCircle,
    Droplets,
    MapPin,
    Sprout,
    Sun,
    Thermometer,
    CloudRain,
    Wind,
    Layers3,
    Plus,
    Trash2,
    PackageCheck,
    Scissors,
    PlayCircle,
    Pencil,
    CheckCircle2,
    Info,
} from "lucide-react";

import { useCrops } from "../../hooks/useCrops";
import { toast } from "react-toastify";
import CultivationSection from "../../components/CultivationSection";
import CultivationForm from "../../components/CultivationForm";

const AdminCropDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { handleGetCropsById, handleCropCultivationCreation, handleCropHarvestCreation } = useCrops();

    const [crop, setCrop] = useState(null);
    const [cultivation, setCultivation] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentImage, setCurrentImage] = useState(0);

    
    /* =========================================================
       CULTIVATION UI STATE
    ========================================================= */

    const [showCultivationForm, setShowCultivationForm] = useState(false);

    const [cultivationSubmitting, setCultivationSubmitting] =
        useState(false);

    const [cultivationError, setCultivationError] = useState("");

    const [cultivationForm, setCultivationForm] =
        useState(createEmptyCultivationForm());

    /* =========================================================
       HARVESTING UI STATE
    ========================================================= */

    const [harvesting, setHarvesting] = useState(null);
    const [showHarvestingForm, setShowHarvestingForm] = useState(false);
    const [harvestingSubmitting, setHarvestingSubmitting] = useState(false);
    const [harvestingError, setHarvestingError] = useState("");
    const [harvestingForm, setHarvestingForm] = useState(
        createEmptyHarvestingForm()
    );

    /* =========================================================
       FETCH CROP
    ========================================================= */

    const handleGetApi = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await handleGetCropsById(id);

            console.log("Response:", response);

            setCrop(response.crop);
            setCultivation(response.cultivation || null);
            const harvestData =
                response.harvesting ||
                response.harvest ||
                response.crop?.harvesting ||
                null;
            setHarvesting(harvestData);

            setCurrentImage(0);

        } catch (error) {
            console.error(error);
            setError("Unable to fetch crop details.");
        } finally {
            setLoading(false);
        }
    };

    /* =========================================================
       FETCH WHEN ID CHANGES
    ========================================================= */

    useEffect(() => {
        handleGetApi();
    }, [id]);

    /* =========================================================
       OPEN ADD FORM
    ========================================================= */

    const handleAddCultivation = () => {
        setCultivationError("");

        setCultivationForm(createEmptyCultivationForm());

        setShowCultivationForm(true);
    };

    /* =========================================================
       OPEN EDIT FORM
    ========================================================= */

    const handleEditCultivation = () => {
        if (!cultivation) {
            return;
        }

        setCultivationError("");

        setCultivationForm(mapCultivationToForm(cultivation));

        setShowCultivationForm(true);
    };

    /* =========================================================
       CANCEL FORM
    ========================================================= */

    const handleCancelCultivation = () => {
        setShowCultivationForm(false);
        setCultivationError("");
    };

    /* =========================================================
       UPDATE MAIN CULTIVATION FIELD
    ========================================================= */

    const handleCultivationChange = (field, value) => {
        setCultivationForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /* =========================================================
       UPDATE STEP
    ========================================================= */

    const handleStepChange = (stepIndex, field, value) => {
        setCultivationForm((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                [field]: value,
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       ADD STEP
    ========================================================= */

    const handleAddStep = () => {
        setCultivationForm((prev) => ({
            ...prev,

            steps: [
                ...prev.steps,

                createEmptyStep(prev.steps.length + 1),
            ],
        }));
    };

    /* =========================================================
       REMOVE STEP
    ========================================================= */

    const handleRemoveStep = (stepIndex) => {
        setCultivationForm((prev) => {
            const updatedSteps = prev.steps
                .filter((_, index) => index !== stepIndex)
                .map((step, index) => ({
                    ...step,
                    stepNumber: index + 1,
                }));

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       ADD RECOMMENDED PRACTICE
    ========================================================= */

    const handleAddPractice = (stepIndex) => {
        setCultivationForm((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],

                recommendedPractices: [
                    ...updatedSteps[stepIndex].recommendedPractices,
                    "",
                ],
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       UPDATE RECOMMENDED PRACTICE
    ========================================================= */

    const handlePracticeChange = (
        stepIndex,
        practiceIndex,
        value
    ) => {
        setCultivationForm((prev) => {
            const updatedSteps = [...prev.steps];

            const updatedPractices = [
                ...updatedSteps[stepIndex].recommendedPractices,
            ];

            updatedPractices[practiceIndex] = value;

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                recommendedPractices: updatedPractices,
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       REMOVE RECOMMENDED PRACTICE
    ========================================================= */

    const handleRemovePractice = (
        stepIndex,
        practiceIndex
    ) => {
        setCultivationForm((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],

                recommendedPractices:
                    updatedSteps[
                        stepIndex
                    ].recommendedPractices.filter(
                        (_, index) => index !== practiceIndex
                    ),
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       HANDLE STEP IMAGES
    ========================================================= */

    const handleStepImagesChange = (
        stepIndex,
        files
    ) => {
        const selectedFiles = Array.from(files);

        setCultivationForm((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],

                stepImages: [
                    ...updatedSteps[stepIndex].stepImages,
                    ...selectedFiles,
                ],
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       REMOVE STEP IMAGE
    ========================================================= */

    const handleRemoveStepImage = (
        stepIndex,
        imageIndex
    ) => {
        setCultivationForm((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],

                stepImages:
                    updatedSteps[
                        stepIndex
                    ].stepImages.filter(
                        (_, index) => index !== imageIndex
                    ),
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    /* =========================================================
       SAVE CULTIVATION
    ========================================================= */

    const handleSaveCultivation = async (event) => {
    event.preventDefault();

    setCultivationError("");

    try {
        setCultivationSubmitting(true);

        const cultivationData = {
            showing_time: cultivationForm.showing_time,
            growing_Duration: cultivationForm.growing_Duration,
            harvesting_Period: cultivationForm.harvesting_Period,
            youtube_url: cultivationForm.youtube_url,

            steps: cultivationForm.steps.map((step) => ({
                stepNumber: step.stepNumber,
                title: step.title,
                description: step.description,

                recommendedPractices:
                    step.recommendedPractices.filter(
                        (practice) => practice.trim()
                    ),

                importantNotes: step.importantNotes
            }))
        };

        console.log("Crop ID:", id);
        console.log("Cultivation Data:", cultivationData);

        // API CALL
        const response =
            await handleCropCultivationCreation(
                id,
                cultivationData
            );

        console.log(
            "API Response:",
            response
        );

        toast.success("Cultivation steps added successfully");

        // Refresh data
        await handleGetApi();



        // Close form
        setShowCultivationForm(false);

    } catch (error) {

        console.error(
            "Cultivation save error:",
            error
        );

        setCultivationError(
            error?.response?.data?.message ||
            "Unable to save cultivation."
        );

    } finally {
        setCultivationSubmitting(false);
    }
};

    /* =========================================================
       HARVESTING FORM HANDLERS
    ========================================================= */

    const handleOpenHarvestingForm = () => {
        setHarvestingError("");
        setHarvestingForm(
            harvesting
                ? mapHarvestingToForm(harvesting)
                : createEmptyHarvestingForm()
        );
        setShowHarvestingForm(true);
    };

    const handleHarvestingFieldChange = (field, value) => {
        setHarvestingForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleHarvestArrayChange = (field, index, value) => {
        setHarvestingForm((prev) => ({
            ...prev,
            [field]: prev[field].map((item, itemIndex) =>
                itemIndex === index ? value : item
            ),
        }));
    };

    const handleAddHarvestArrayItem = (field) => {
        setHarvestingForm((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const handleRemoveHarvestArrayItem = (field, index) => {
        setHarvestingForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, itemIndex) => itemIndex !== index),
        }));
    };

    const handleHarvestStepChange = (index, field, value) => {
        setHarvestingForm((prev) => ({
            ...prev,
            steps: prev.steps.map((step, stepIndex) =>
                stepIndex === index ? { ...step, [field]: value } : step
            ),
        }));
    };

    const handleAddHarvestStep = () => {
        setHarvestingForm((prev) => ({
            ...prev,
            steps: [
                ...prev.steps,
                createEmptyHarvestStep(prev.steps.length + 1),
            ],
        }));
    };

    const handleRemoveHarvestStep = (index) => {
        setHarvestingForm((prev) => ({
            ...prev,
            steps: prev.steps
                .filter((_, stepIndex) => stepIndex !== index)
                .map((step, stepIndex) => ({
                    ...step,
                    stepNumber: stepIndex + 1,
                })),
        }));
    };

    const handleSaveHarvesting = async (event) => {
        event.preventDefault();
        setHarvestingError("");

        const harvestingData = {
            harvestingTime: harvestingForm.harvestingTime.trim(),
            maturityIndicators: harvestingForm.maturityIndicators
                .map((item) => item.trim())
                .filter(Boolean),
            harvestingMethod: harvestingForm.harvestingMethod.trim(),
            steps: harvestingForm.steps.map((step, index) => ({
                stepNumber: index + 1,
                title: step.title.trim(),
                description: step.description.trim(),
            })).filter((step) => step.title || step.description),
            postHarvestHandling: harvestingForm.postHarvestHandling
                .map((item) => item.trim())
                .filter(Boolean),
            storage: harvestingForm.storage.trim(),
            youtubeUrl: harvestingForm.youtubeUrl.trim(),
        };

        try {
            setHarvestingSubmitting(true);
            await handleCropHarvestCreation(id, harvestingData);
            toast.success("Harvesting details saved successfully.");
            setHarvesting(harvestingData);
            setShowHarvestingForm(false);
            await handleGetApi();
        } catch (err) {
            console.error("Harvesting save error:", err);
            const message =
                err?.response?.data?.message ||
                "Unable to save harvesting details.";
            setHarvestingError(
                Array.isArray(message)
                    ? message.map((item) => item.msg || item.message || String(item)).join(", ")
                    : message
            );
        } finally {
            setHarvestingSubmitting(false);
        }
    };

    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-green-600" />
            </div>
        );
    }

    /* =========================================================
       ERROR
    ========================================================= */

    if (error) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center">
                <p className="mb-4 text-red-500">
                    {error}
                </p>

                <button
                    onClick={handleGetApi}
                    className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    /* =========================================================
       CROP NOT FOUND
    ========================================================= */

    if (!crop) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <p className="text-slate-500">
                    Crop not found.
                </p>
            </div>
        );
    }

    /* =========================================================
       IMAGES
    ========================================================= */

    const images = crop.images || [];

    const currentImageUrl =
        images[currentImage]?.imageUrl;

    /* =========================================================
       SLIDER
    ========================================================= */

    const handlePrevious = () => {
        setCurrentImage((prev) => {
            if (prev === 0) {
                return images.length - 1;
            }

            return prev - 1;
        });
    };

    const handleNext = () => {
        setCurrentImage((prev) => {
            if (prev === images.length - 1) {
                return 0;
            }

            return prev + 1;
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <button
                        onClick={() => navigate(-1)}
                        className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                    >
                        <ArrowLeft size={18} />

                        Back to Crops
                    </button>

                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        {crop.name}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Crop ID: #{crop.id}
                    </p>

                </div>

                <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {crop.category ||
                        "Uncategorized"}
                </span>

            </div>

            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <div className="flex flex-col gap-6">

                {/* ================================================= */}
                {/* IMAGE SLIDER */}
                {/* ================================================= */}

                <div className="w-full">
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex-row">
                        {/* Thumbnail Gallery: left side on desktop, horizontal on mobile */}
                        {images.length > 1 && (
                            <div className="flex shrink-0 flex-row gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 sm:w-28 sm:flex-col sm:overflow-x-hidden sm:overflow-y-auto sm:border-b-0 sm:border-r md:w-32">
                                {images.map((image, index) => (
                                    <button
                                        key={image.id || index}
                                        type="button"
                                        onClick={() => setCurrentImage(index)}
                                        aria-label={`Show image ${index + 1}`}
                                        aria-pressed={currentImage === index}
                                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-auto sm:w-full sm:aspect-square ${
                                            currentImage === index
                                                ? "border-green-600 ring-2 ring-green-100"
                                                : "border-slate-200 hover:border-green-400"
                                        }`}
                                    >
                                        <img
                                            src={image.imageUrl}
                                            alt={`${crop.name} thumbnail ${index + 1}`}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Image */}
                        <div className="relative min-h-[350px] min-w-0 flex-1 overflow-hidden bg-slate-100 sm:min-h-[450px]">
                            {currentImageUrl ? (
                                <>
                                    {/* Blurred Background */}
                                    <img
                                        src={currentImageUrl}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 h-full w-full object-cover opacity-40 blur-2xl"
                                    />

                                    {/* Selected Image */}
                                    <img
                                        src={currentImageUrl}
                                        alt={`${crop.name} - image ${currentImage + 1}`}
                                        className="absolute left-1/2 top-1/2 max-h-[550px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-2xl object-contain transition-all duration-300"
                                    />

                                    {images.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handlePrevious}
                                                aria-label="Previous image"
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
                                            >
                                                <ArrowLeftCircle size={40} fill="rgba(0,0,0,0.45)" strokeWidth={1.5} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                aria-label="Next image"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
                                            >
                                                <ArrowRightCircle size={40} fill="rgba(0,0,0,0.45)" strokeWidth={1.5} />
                                            </button>
                                            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                                                {currentImage + 1} / {images.length}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex min-h-[350px] items-center justify-center text-sm text-slate-400 sm:min-h-[450px]">
                                    No Image Available
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* ================================================= */}
                {/* RIGHT INFORMATION */}
                {/* ================================================= */}

                <div className="space-y-6">

                    {/* ================================================= */}
                    {/* BASIC INFORMATION */}
                    {/* ================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                <Sprout size={21} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Basic Information
                                </h2>

                                <p className="text-sm text-slate-500">
                                    General information about this crop
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <InfoItem
                                label="Crop Name"
                                value={crop.name}
                            />

                            <InfoItem
                                label="Scientific Name"
                                value={
                                    crop.scientificName
                                }
                                italic
                            />

                            <InfoItem
                                label="Category"
                                value={
                                    crop.category
                                }
                            />

                            <InfoItem
                                label="Origin"
                                value={crop.origin}
                                icon={
                                    <MapPin
                                        size={16}
                                    />
                                }
                            />

                        </div>

                    </section>

                    {/* ================================================= */}
                    {/* DESCRIPTION */}
                    {/* ================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

                        <h2 className="mb-3 text-lg font-semibold text-slate-900">
                            Description
                        </h2>

                        <p className="text-sm leading-7 text-slate-600">
                            {crop.description ||
                                "No description available."}
                        </p>

                    </section>

                    {/* ================================================= */}
                    {/* GROWING CONDITIONS */}
                    {/* ================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

                        <div className="mb-5">

                            <h2 className="text-lg font-semibold text-slate-900">
                                Growing Conditions
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Environmental requirements for growing this crop
                            </p>

                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <ConditionCard
                                icon={
                                    <Layers3
                                        size={20}
                                    />
                                }
                                label="Soil"
                                value={
                                    crop.soil
                                }
                            />

                            <ConditionCard
                                icon={
                                    <Thermometer
                                        size={20}
                                    />
                                }
                                label="Temperature"
                                value={
                                    crop.temperature
                                }
                            />

                            <ConditionCard
                                icon={
                                    <CloudRain
                                        size={20}
                                    />
                                }
                                label="Rainfall"
                                value={
                                    crop.rainfall
                                }
                            />

                            <ConditionCard
                                icon={
                                    <Wind
                                        size={20}
                                    />
                                }
                                label="Humidity"
                                value={
                                    crop.humidity
                                }
                            />

                            <ConditionCard
                                icon={
                                    <Sun
                                        size={20}
                                    />
                                }
                                label="Sunlight"
                                value={
                                    crop.sunlight
                                }
                            />

                            <ConditionCard
                                icon={
                                    <Droplets
                                        size={20}
                                    />
                                }
                                label="Water Requirement"
                                value={
                                    crop.waterRequirement
                                }
                            />

                        </div>

                    </section>

                    {/* ================================================= */}
                    {/* CULTIVATION */}
                    {/* ================================================= */}

                    <CultivationSection
                        cultivation={cultivation}
                        onAdd={handleAddCultivation}
                        onEdit={handleEditCultivation}
                    />

                    {/* ================================================= */}
                    {/* HARVESTING DETAILS */}
                    {/* ================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                        {/* Header */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                                    <PackageCheck size={21} />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-slate-900">Harvesting</h2>
                                    <p className="text-sm text-slate-500">
                                        Harvesting guide, maturity indicators and post-harvest handling.
                                    </p>
                                </div>
                            </div>

                            {harvesting && (
                                <button
                                    type="button"
                                    onClick={handleOpenHarvestingForm}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                >
                                    <Pencil size={16} />
                                    Edit Harvesting
                                </button>
                            )}
                        </div>

                        {!harvesting ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                    <PackageCheck size={26} />
                                </div>
                                <h3 className="text-base font-semibold text-slate-800">
                                    No harvesting guide yet
                                </h3>
                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    Add harvesting time, maturity indicators, step-by-step harvesting instructions,
                                    post-harvest handling and storage information.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleOpenHarvestingForm}
                                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                >
                                    <Plus size={17} />
                                    Add Harvesting
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Harvesting overview */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center gap-2 text-amber-700">
                                            <Scissors size={20} />
                                            <span className="text-sm font-semibold text-slate-700">Harvesting Time</span>
                                        </div>
                                        <p className="text-sm leading-6 text-slate-600">
                                            {harvesting.harvestingTime || "Not available"}
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center gap-2 text-amber-700">
                                            <CheckCircle2 size={20} />
                                            <span className="text-sm font-semibold text-slate-700">Harvesting Method</span>
                                        </div>
                                        <p className="text-sm leading-6 text-slate-600">
                                            {harvesting.harvestingMethod || "Not available"}
                                        </p>
                                    </div>
                                </div>

                                {/* YouTube tutorial */}
                                {harvesting.youtubeUrl && (
                                    <div className="mt-5 flex flex-col gap-4 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                                <PlayCircle size={22} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">Harvesting Tutorial</p>
                                                <p className="text-xs text-slate-500">YouTube video available</p>
                                            </div>
                                        </div>
                                        <a
                                            href={harvesting.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                                        >
                                            <PlayCircle size={17} />
                                            Watch Video
                                        </a>
                                    </div>
                                )}

                                {/* Maturity indicators */}
                                <div className="mt-8">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-slate-900">Maturity Indicators</h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Signs that indicate the crop is ready to harvest.
                                        </p>
                                    </div>
                                    {harvesting.maturityIndicators?.length ? (
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {harvesting.maturityIndicators.map((indicator, index) => (
                                                <div key={`${indicator}-${index}`} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                                                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
                                                    <p className="text-sm leading-6 text-slate-600">{indicator}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500">No maturity indicators added.</p>
                                    )}
                                </div>

                                {/* Harvesting steps */}
                                <div className="mt-8">
                                    <div className="mb-5">
                                        <h3 className="text-lg font-semibold text-slate-900">Harvesting Steps</h3>
                                        <p className="mt-1 text-sm text-slate-500">Step-by-step harvesting process.</p>
                                    </div>
                                    {harvesting.steps?.length ? (
                                        <div className="space-y-5">
                                            {harvesting.steps.map((step, index) => (
                                                <div key={step.id || `${step.stepNumber}-${index}`} className="overflow-hidden rounded-xl border border-slate-200">
                                                    <div className="flex items-start gap-4 bg-slate-50 p-5">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 font-bold text-white">
                                                            {step.stepNumber || index + 1}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                                                                Step {step.stepNumber || index + 1}
                                                            </p>
                                                            <h4 className="mt-1 text-base font-semibold text-slate-900">
                                                                {step.title || `Harvesting step ${index + 1}`}
                                                            </h4>
                                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                                {step.description || "No description available."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500">No harvesting steps added.</p>
                                    )}
                                </div>

                                {/* Post-harvest handling and storage */}
                                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <div className="mb-3 flex items-center gap-2">
                                            <CheckCircle2 size={18} className="text-green-600" />
                                            <h3 className="font-semibold text-slate-800">Post-Harvest Handling</h3>
                                        </div>
                                        {harvesting.postHarvestHandling?.length ? (
                                            <div className="space-y-2">
                                                {harvesting.postHarvestHandling.map((instruction, index) => (
                                                    <div key={`${instruction}-${index}`} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                                                        <p className="text-sm leading-6 text-slate-600">{instruction}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-500">No post-harvest handling instructions added.</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="mb-3 flex items-center gap-2">
                                            <Info size={18} className="text-amber-600" />
                                            <h3 className="font-semibold text-slate-800">Storage Instructions</h3>
                                        </div>
                                        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                                            <p className="text-sm leading-6 text-amber-800">
                                                {harvesting.storage || "No storage instructions added."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>

                    {showHarvestingForm && (
                        <form onSubmit={handleSaveHarvesting} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        {harvesting ? "Edit Harvesting Details" : "Add Harvesting Details"}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">Add as many indicators, steps and post-harvest instructions as needed.</p>
                                </div>
                                <button type="button" onClick={() => setShowHarvestingForm(false)} className="text-sm font-medium text-slate-500 hover:text-slate-800">
                                    Cancel
                                </button>
                            </div>

                            {harvestingError && (
                                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {harvestingError}
                                </div>
                            )}

                            <FormField label="Harvesting Time" hint="When should this crop be harvested?">
                                <textarea required rows={2} value={harvestingForm.harvestingTime} onChange={(e) => handleHarvestingFieldChange("harvestingTime", e.target.value)} className={inputClass} placeholder="Harvest during cool, dry morning hours..." />
                            </FormField>

                            <FormField label="Harvesting Method">
                                <textarea required rows={2} value={harvestingForm.harvestingMethod} onChange={(e) => handleHarvestingFieldChange("harvestingMethod", e.target.value)} className={inputClass} placeholder="Describe the recommended harvesting method..." />
                            </FormField>

                            <DynamicStringFields
                                title="Maturity Indicators"
                                description="Add multiple signs that show the crop is ready."
                                items={harvestingForm.maturityIndicators}
                                onChange={(index, value) => handleHarvestArrayChange("maturityIndicators", index, value)}
                                onAdd={() => handleAddHarvestArrayItem("maturityIndicators")}
                                onRemove={(index) => handleRemoveHarvestArrayItem("maturityIndicators", index)}
                                placeholder="e.g. Uniform mature color"
                            />

                            <div>
                                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Harvesting Steps</h3>
                                        <p className="text-sm text-slate-500">Each step has a title and description.</p>
                                    </div>
                                    <button type="button" onClick={handleAddHarvestStep} className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50">
                                        <Plus size={16} /> Add Step
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {harvestingForm.steps.map((step, index) => (
                                        <div key={index} className="rounded-xl border border-slate-200 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <h4 className="font-semibold text-slate-800">Step {index + 1}</h4>
                                                {harvestingForm.steps.length > 1 && (
                                                    <button type="button" onClick={() => handleRemoveHarvestStep(index)} className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
                                                        <Trash2 size={15} /> Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="space-y-3">
                                                <FormField label="Title">
                                                    <input required value={step.title} onChange={(e) => handleHarvestStepChange(index, "title", e.target.value)} className={inputClass} placeholder="e.g. Inspect the crop" />
                                                </FormField>
                                                <FormField label="Description">
                                                    <textarea required rows={3} value={step.description} onChange={(e) => handleHarvestStepChange(index, "description", e.target.value)} className={inputClass} placeholder="Explain this harvesting step..." />
                                                </FormField>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <DynamicStringFields
                                title="Post-Harvest Handling"
                                description="Add multiple instructions for cleaning, drying, grading, packing, etc."
                                items={harvestingForm.postHarvestHandling}
                                onChange={(index, value) => handleHarvestArrayChange("postHarvestHandling", index, value)}
                                onAdd={() => handleAddHarvestArrayItem("postHarvestHandling")}
                                onRemove={(index) => handleRemoveHarvestArrayItem("postHarvestHandling", index)}
                                placeholder="e.g. Pack in clean, ventilated containers"
                            />

                            <FormField label="Storage Instructions">
                                <textarea rows={2} value={harvestingForm.storage} onChange={(e) => handleHarvestingFieldChange("storage", e.target.value)} className={inputClass} placeholder="Cool, dry, well-ventilated storage instructions..." />
                            </FormField>

                            <FormField label="YouTube URL (optional)">
                                <input type="url" value={harvestingForm.youtubeUrl} onChange={(e) => handleHarvestingFieldChange("youtubeUrl", e.target.value)} className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
                            </FormField>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button type="button" onClick={() => setShowHarvestingForm(false)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={harvestingSubmitting} className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">
                                    {harvestingSubmitting ? "Saving..." : "Save Harvesting Details"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ================================================= */}
                    {/* CULTIVATION FORM */}
                    {/* ================================================= */}

                    {showCultivationForm && (
                        <CultivationForm
                            form={cultivationForm}
                            editing={Boolean(
                                cultivation
                            )}
                            submitting={
                                cultivationSubmitting
                            }
                            error={
                                cultivationError
                            }
                            onChange={
                                handleCultivationChange
                            }
                            onStepChange={
                                handleStepChange
                            }
                            onAddStep={
                                handleAddStep
                            }
                            onRemoveStep={
                                handleRemoveStep
                            }
                            onAddPractice={
                                handleAddPractice
                            }
                            onPracticeChange={
                                handlePracticeChange
                            }
                            onRemovePractice={
                                handleRemovePractice
                            }
                            onStepImagesChange={
                                handleStepImagesChange
                            }
                            onRemoveStepImage={
                                handleRemoveStepImage
                            }
                            onSubmit={
                                handleSaveCultivation
                            }
                            onCancel={
                                handleCancelCultivation
                            }
                        />
                    )}

                </div>
            </div>
        </div>
    );
};


/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
    label,
    value,
    italic = false,
    icon = null,
}) => {
    return (
        <div>

            <div className="mb-1 flex items-center gap-1.5">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                {icon && (
                    <span className="text-slate-400">
                        {icon}
                    </span>
                )}

            </div>

            <p
                className={`text-sm font-medium text-slate-800 ${
                    italic ? "italic" : ""
                }`}
            >
                {value ||
                    "Not available"}
            </p>

        </div>
    );
};


/* =========================================================
   CONDITION CARD
========================================================= */

const ConditionCard = ({
    icon,
    label,
    value,
}) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-green-200 hover:bg-green-50/40">

            <div className="mb-3 flex items-center gap-2 text-green-600">

                {icon}

                <span className="text-sm font-semibold text-slate-700">
                    {label}
                </span>

            </div>

            <p className="text-sm leading-6 text-slate-600">
                {value ||
                    "Not available"}
            </p>

        </div>
    );
};



const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

const FormField = ({ label, hint, children }) => (
    <label className="block space-y-1.5">
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        {hint && <span className="block text-xs text-slate-500">{hint}</span>}
        {children}
    </label>
);

const DynamicStringFields = ({
    title,
    description,
    items,
    onChange,
    onAdd,
    onRemove,
    placeholder,
}) => (
    <div>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <button type="button" onClick={onAdd} className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50">
                <Plus size={16} /> Add Item
            </button>
        </div>
        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                    <input
                        value={item}
                        onChange={(event) => onChange(index, event.target.value)}
                        className={inputClass}
                        placeholder={placeholder}
                    />
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        disabled={items.length === 1}
                        aria-label={`Remove ${title} item ${index + 1}`}
                        className="rounded-lg border border-red-200 p-2.5 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const StringList = ({ items = [], emptyText }) => (
    items?.length ? (
        <ul className="list-inside list-disc space-y-1.5 text-sm leading-6 text-slate-600">
            {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
        </ul>
    ) : <p className="text-sm text-slate-500">{emptyText}</p>
);

/* =========================================================
   EMPTY HARVESTING FORM
========================================================= */

const createEmptyHarvestingForm = () => ({
    harvestingTime: "",
    maturityIndicators: [""],
    harvestingMethod: "",
    steps: [createEmptyHarvestStep(1)],
    postHarvestHandling: [""],
    storage: "",
    youtubeUrl: "",
});

const createEmptyHarvestStep = (stepNumber) => ({
    stepNumber,
    title: "",
    description: "",
});

const mapHarvestingToForm = (harvesting) => ({
    harvestingTime: harvesting.harvestingTime || "",
    maturityIndicators: harvesting.maturityIndicators?.length
        ? [...harvesting.maturityIndicators]
        : [""],
    harvestingMethod: harvesting.harvestingMethod || "",
    steps: harvesting.steps?.length
        ? harvesting.steps.map((step, index) => ({
            stepNumber: step.stepNumber || index + 1,
            title: step.title || "",
            description: step.description || "",
        }))
        : [createEmptyHarvestStep(1)],
    postHarvestHandling: harvesting.postHarvestHandling?.length
        ? [...harvesting.postHarvestHandling]
        : [""],
    storage: harvesting.storage || "",
    youtubeUrl: harvesting.youtubeUrl || harvesting.youtube_url || "",
});

/* =========================================================
   EMPTY CULTIVATION FORM
========================================================= */

const createEmptyCultivationForm = () => {
    return {
        showing_time: "",

        growing_Duration: "",

        harvesting_Period: "",

        youtube_url: "",

        steps: [
            createEmptyStep(1),
        ],
    };
};


/* =========================================================
   EMPTY STEP
========================================================= */

const createEmptyStep = (
    stepNumber
) => {
    return {
        id: null,

        stepNumber,

        title: "",

        description: "",

        recommendedPractices: [
            "",
        ],

        importantNotes: "",

        stepImages: [],
    };
};


/* =========================================================
   MAP EXISTING CULTIVATION TO FORM
========================================================= */

const mapCultivationToForm = (
    cultivation
) => {
    return {
        showing_time:
            cultivation.showing_time ||
            "",

        growing_Duration:
            cultivation.growing_Duration ||
            "",

        harvesting_Period:
            cultivation.harvesting_Period ||
            "",

        youtube_url:
            cultivation.youtube_url ||
            "",

        steps:
            cultivation.steps?.map(
                (step, index) => ({
                    id: step.id || null,

                    stepNumber:
                        step.stepNumber ||
                        index + 1,

                    title:
                        step.title || "",

                    description:
                        step.description ||
                        "",

                    recommendedPractices:
                        step.recommendedPractices
                            ?.length
                            ? [
                                  ...step.recommendedPractices,
                              ]
                            : [""],

                    importantNotes:
                        step.importantNotes ||
                        "",

                    /*
                     Existing backend images can be
                     kept here for display.

                     New files can also be pushed
                     into this same array.
                    */

                    stepImages:
                        step.stepImages ||
                        step.images ||
                        [],
                })
            ) || [createEmptyStep(1)],
    };
};

export default AdminCropDetailsPage;