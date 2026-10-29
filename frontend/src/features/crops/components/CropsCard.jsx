import React from 'react'
import { Heart, ArrowUpRight,  Bookmark, Delete, Trash } from "lucide-react";
import { useNavigate } from 'react-router';

const CropsCard = ({crop, isSaved, handleSaveCrops, handleRemoveCrop}) => {
    const navigate = useNavigate();


  return (
    <div
  key={crop.id}
  className="
    group relative overflow-hidden
    rounded-3xl
    border border-[#e5eadf]
    bg-white
    shadow-sm
    transition-all duration-300
    hover:-translate-y-2
    hover:shadow-xl
  "
>
  {/* Image Section */}
  <div className="relative h-64 w-full overflow-hidden bg-[#edf1e9]">

    {crop.images?.length > 0 ? (
      <img
        src={crop.images[0].imageUrl}
        alt={crop.name}
        className="
          h-full w-full object-cover
          transition-transform duration-700
          group-hover:scale-110
        "
      />
    ) : (
      <div className="flex h-full items-center justify-center text-gray-400">
        No Image
      </div>
    )}

    {/* Dark Gradient */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-black/60
        via-black/10
        to-transparent
      "
    />

    {/* Category */}
    <span
      className="
        absolute left-4 top-4
        rounded-full
        bg-white/90
        px-3.5 py-1.5
        text-xs font-semibold
        text-[#39542c]
        shadow-sm
        backdrop-blur-sm
      "
    >
      {crop.category}
    </span>


    {/* Save Button */}
    { 
    !isSaved && 
    <button
    onClick={() => handleSaveCrops(crop.id)}
    className={`absolute top-3 right-3 w-10 h-10 rounded-full
    flex items-center justify-center
    shadow-md transition
    text-green-700 bg-gray-200
  `}
>
  <Bookmark
    size={20}
    fill={"currentColor"}
  />
    </button>

    }


    {/* Remove Button */}
    { 
    isSaved && 
    <button
    onClick={() => handleRemoveCrop(crop.id)}
    className={`absolute top-3 right-3 w-10 h-10 rounded-full
    flex items-center justify-center
    shadow-md transition
    text-red-800 bg-gray-200
  `}
>
  <Trash 
    size={20}
    fill={"currentColor"}
  />
    </button>

    }

    {/* Crop Name on Image */}
    <div className="absolute bottom-4 left-5 right-5">
      <h2 className="text-2xl font-bold text-white drop-shadow-md">
        {crop.name}
      </h2>

      <p className="mt-1 text-sm italic text-white/80">
        {crop.scientificName}
      </p>
    </div>
  </div>

  {/* Content */}
  <div className="p-5">

    <p className="
      mb-5
      line-clamp-2
      min-h-[48px]
      text-sm
      leading-6
      text-gray-600
    ">
      {crop.description}
    </p>

    {/* Bottom */}
    <div className="flex items-center justify-between">

      <button
        onClick={() => navigate(`/crops/${crop.id}`)}
        className="
          group/btn
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-[#39542c]
          px-4 py-2.5
          text-sm font-semibold
          text-white
          transition-all
          hover:bg-[#2d4223]
        "
      >
        View Details

        <ArrowUpRight
          size={17}
          className="
            transition-transform
            group-hover/btn:translate-x-0.5
            group-hover/btn:-translate-y-0.5
          "
        />
      </button>

      {/* Small crop info */}
      <span className="text-xs font-medium text-gray-400">
        Crop #{crop.id}
      </span>

    </div>
  </div>
</div>
  )
}

export default CropsCard