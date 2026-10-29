import React from "react";
import { useNavigate } from "react-router";
import {
  Bookmark,
  BookmarkX,
  Droplets,
  MapPin,
  Sprout,
  Sun,
  Thermometer,
  CloudRain,
  Wind,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { useSelector } from "react-redux";
import CropsCard from "../../components/CropsCard";
import { useCrops } from "../../hooks/useCrops";

const SavedPage = () => {

  const navigate = useNavigate();
  const { handleRemoveSavedCrops } = useCrops();

  const { savedCrops } = useSelector(state => state.auth);
  const savedCropIds = new Set(
    savedCrops?.map((savedItem) => savedItem.crop?.id) || []
  );

  const handleViewDetails = (cropId) => {
    navigate(`/crops/${cropId}`);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";

    const markdownUrl = imageUrl.match(/\((https?:\/\/.*?)\)/);

    return markdownUrl ? markdownUrl[1] : imageUrl;
  };

  if (!savedCrops || savedCrops.length === 0) {
    return (
      <div className="min-h-[92vh] bg-[#f7faf5] flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center bg-white rounded-2xl border border-green-100 shadow-sm px-8 py-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <Bookmark className="w-9 h-9 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            No Saved Crops
          </h2>

          <p className="text-gray-500 mt-3 leading-6">
            You haven't saved any crops yet. Explore crops and save the ones
            you want to learn about later.
          </p>

          <button
            onClick={() => navigate("/crops")}
            className="mt-7 px-6 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-medium transition"
          >
            Explore Crops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf5]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#284d25] to-[#46763a] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
              <Bookmark className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Saved Crops
              </h1>

              <p className="text-green-100 mt-1">
                Crops you've bookmarked for later.
              </p>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
            <Leaf className="w-4 h-4" />

            {savedCrops.length}{" "}
            {savedCrops.length === 1 ? "crop saved" : "crops saved"}
          </div>
        </div>
      </section>

      {/* Crops */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {savedCrops.map((savedItem) => {
            const crop = savedItem.crop;

            const image =
              crop?.images?.length > 0
                ? getImageUrl(crop.images[0].imageUrl)
                : null;

            return (
              <CropsCard crop={crop} isSaved={savedCropIds.has(crop.id)} handleSaveCrops={handleRemoveSavedCrops} handleRemoveCrop={handleRemoveSavedCrops} />
            );
          })}
        </div>
      </section>
    </div>
  );
};

const Info = ({ icon, title, value }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="flex items-center gap-2 text-green-700">
        {icon}

        <span className="text-xs font-medium text-gray-500">
          {title}
        </span>
      </div>

      <p className="mt-1 text-sm font-semibold text-gray-700 truncate">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default SavedPage;