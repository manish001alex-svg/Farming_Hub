import React from 'react'
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
import { useNavigate } from 'react-router';

const CropsList = ({crop}) => {
    const navigate = useNavigate();

    console.log("Croppy",crop);

    const handleView =  (e) =>{
        navigate(`/admin/dashboard/${crop.id}`);
    }

    return (
        <div
            key={crop.id}
            className="
                    grid
                    grid-cols-[185px_1.3fr_1fr_1.2fr]
                    items-center
                    border-b
                    border-slate-200
                    px-5
                    py-5
                    last:border-b-0
                  "
        >

            {/* Image */}
            <div>
                <img
                    src={crop.images[0].imageUrl}
                    alt={crop.name}
                    className="
                        h-[100px]
                        w-[100px]
                        rounded-xl
                        object-cover
                      "
                />
            </div>

            {/* Name */}
            <div>
                <h3 className="text-[19px] font-bold text-slate-900">
                    {crop.name}
                </h3>

                <p className="mt-1 text-[15px] italic text-slate-500">
                    {crop.scientificName}
                </p>
            </div>

            {/* Category */}
            <div>
                <span
                    className={`
                        inline-flex
                        rounded-lg
                        px-5
                        py-2
                        text-[14px]
                        font-semibold bg-slate-100 text-slate-700
                      `}
                >
                    {crop.category}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5">

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-emerald-50
                        px-5
                        py-2
                        text-[15px]
                        font-semibold
                        text-emerald-700
                        transition
                        hover:bg-emerald-100
                      "

                      onClick={handleView}
                >
                    <Eye size={20} />
                    View
                </button>

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-red-50
                        px-5
                        py-
                        text-[15px]
                        font-semibold
                        text-red-500
                        transition
                        hover:bg-red-100
                      "
                >
                    <Trash2 size={20} />
                    Delete
                </button>

            </div>
        </div>
    )
}

export default CropsList