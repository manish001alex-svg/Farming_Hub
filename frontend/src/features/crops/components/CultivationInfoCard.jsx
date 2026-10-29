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
    CalendarDays,
    Clock3,
    Scissors,
    PlayCircle,
    Pencil,
    Plus,
    Trash2,
    X,
    Save,
    CheckCircle2,
    Info,
    ImagePlus,
} from "lucide-react";

const CultivationInfoCard = ({
    icon,
    title,
    value,
}) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                {icon}
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {title}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
                {value ||
                    "Not available"}
            </p>

        </div>
    );
};

export default CultivationInfoCard;