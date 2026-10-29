import React, { useState } from "react";
import { useCrops } from "../../hooks/useCrops";
import { toast } from "react-toastify";

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
];

const CropCreationPage = () => {

    const { handleCreateNewCrops } = useCrops();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        scientificName: "",
        category: "",
        description: "",
        origin: "",
        soil: "",
        temperature: "",
        rainfall: "",
        humidity: "",
        sunlight: "",
        waterRequirement: "",
    })

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);

        if (images.length + selectedImages.length > 5) {
            alert("You can upload maximum 5 images.");
            return;
        }

        setImages((prev) => [...prev, ...selectedImages]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: "" });

        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            await handleCreateNewCrops(images, formData);
            toast.success("Crop added successully");
            setFormData({
                name: "",
                scientificName: "",
                category: "",
                description: "",
                origin: "",
                soil: "",
                temperature: "",
                rainfall: "",
                humidity: "",
                sunlight: "",
                waterRequirement: "",
            });
            setImages([]);
        } catch (error) {
            console.log("Error: ", error.response.data.errors);
            // setErrors(error.response.data.errors);
            const errors = error.response?.data?.errors;

            if (errors?.authentication) {
                toast.error(errors.authentication);
                return;
            }

            setErrors(errors || {});
        }
        finally {
            setIsSubmitting(false);
        };
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Add New Crop
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Add crop information, images and growing requirements.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Images */}
                    <section>
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Crop Images
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add 1 to 5 images of the crop.
                            </p>
                        </div>

                        {/* Upload box */}
                        {images.length < 5 && (
                            <label
                                htmlFor="crop-images"
                                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition hover:border-green-500 hover:bg-green-50"
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V7.5m0 0L8.25 11.25M12 7.5l3.75 3.75M4.5 19.5h15"
                                        />
                                    </svg>
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    Click to upload crop images
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG or WEBP · Maximum 5 images
                                </p>

                                <input
                                    id="crop-images"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                            </label>
                        )}

                        {/* Image previews */}
                        {images.length > 0 && (
                            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                                {images.map((image, index) => (
                                    <div
                                        key={`${image.name}-${index}`}
                                        className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Crop ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />

                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                                        >
                                            ×
                                        </button>

                                        {/* Image number */}
                                        <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Counter */}
                        <div className="mt-3 flex justify-between text-xs text-gray-500">
                            <span>
                                {images.length === 0
                                    ? "At least 1 image is required"
                                    : `${images.length} image${images.length > 1 ? "s" : ""} selected`}
                            </span>

                            <span>{images.length}/5</span>
                        </div>
                    </section>

                    {/* Basic Information */}
                    <section>
                        <h2 className="mb-5 text-lg font-semibold text-gray-900">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Crop Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="e.g. Wheat"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Scientific Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Scientific Name
                                </label>

                                <input
                                    type="text"
                                    name="scientificName"
                                    onChange={handleChange}
                                    placeholder="e.g. Triticum aestivum"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.scientificName && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.scientificName}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                >
                                    <option value="">Select category</option>

                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            {/* Origin */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Origin
                                </label>

                                <input
                                    type="text"
                                    name="origin"
                                    onChange={handleChange}
                                    placeholder="e.g. Southwestern Asia"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.origin && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.origin}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="4"
                                    onChange={handleChange}
                                    placeholder="Describe the crop..."
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Growing Requirements */}
                    <section>
                        <h2 className="mb-5 text-lg font-semibold text-gray-900">
                            Growing Requirements
                        </h2>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Soil */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Soil
                                </label>

                                <input
                                    type="text"
                                    name="soil"
                                    onChange={handleChange}
                                    placeholder="e.g. Loamy, well-drained soil"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.soil && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.soil}
                                    </p>
                                )}
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Temperature
                                </label>

                                <input
                                    type="text"
                                    name="temperature"
                                    onChange={handleChange}
                                    placeholder="e.g. 15°C - 25°C"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.temperature && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.temperature}
                                    </p>
                                )}
                            </div>

                            {/* Rainfall */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Rainfall
                                </label>

                                <input
                                    type="text"
                                    name="rainfall"
                                    onChange={handleChange}
                                    placeholder="e.g. 500 - 1000 mm"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.rainfall && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.rainfall}
                                    </p>
                                )}
                            </div>

                            {/* Humidity */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Humidity
                                </label>

                                <input
                                    type="text"
                                    name="humidity"
                                    onChange={handleChange}
                                    placeholder="e.g. 50% - 70%"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.humidity && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.humidity}
                                    </p>
                                )}
                            </div>

                            {/* Sunlight */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Sunlight
                                </label>

                                <input
                                    type="text"
                                    name="sunlight"
                                    onChange={handleChange}
                                    placeholder="e.g. Full sunlight"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.sunlight && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.sunlight}
                                    </p>
                                )}
                            </div>

                            {/* Water */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Water Requirement
                                </label>

                                <input
                                    type="text"
                                    name="waterRequirement"
                                    onChange={handleChange}
                                    placeholder="e.g. Moderate"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />

                                {errors.waterRequirement && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.waterRequirement}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="flex justify-end border-t border-gray-100 pt-6">
                        <button
                            type="submit"
                            disabled={images.length === 0 || isSubmitting}
                            className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            {isSubmitting ? "Adding Crop..." : "Add Crop"}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
};

export default CropCreationPage;