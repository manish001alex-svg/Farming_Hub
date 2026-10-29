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
import CultivationInfoCard from "./CultivationInfoCard";

const CultivationSection = ({
    cultivation,
    onAdd,
    onEdit,
}) => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

            {/* Header */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <Sprout size={21} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900">
                            Cultivation
                        </h2>

                        <p className="text-sm text-slate-500">
                            Cultivation guide and farming steps
                        </p>
                    </div>

                </div>

                {cultivation && (
                    <button
                        onClick={onEdit}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                        <Pencil size={16} />

                        Edit Cultivation
                    </button>
                )}

            </div>

            {/* No Cultivation */}

            {!cultivation ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Sprout size={26} />
                    </div>

                    <h3 className="text-base font-semibold text-slate-800">
                        No cultivation guide yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                        Add sowing information, growing duration,
                        harvesting period, YouTube tutorial and
                        step-by-step cultivation instructions.
                    </p>

                    <button
                        onClick={onAdd}
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                        <Plus size={17} />

                        Add Cultivation
                    </button>

                </div>
            ) : (
                <>

                    {/* Overview */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <CultivationInfoCard
                            icon={
                                <CalendarDays
                                    size={20}
                                />
                            }
                            title="Sowing Time"
                            value={
                                cultivation.showing_time
                            }
                        />

                        <CultivationInfoCard
                            icon={
                                <Clock3 size={20} />
                            }
                            title="Growing Duration"
                            value={
                                cultivation.growing_Duration
                            }
                        />

                        <CultivationInfoCard
                            icon={
                                <Scissors size={20} />
                            }
                            title="Harvesting Period"
                            value={
                                cultivation.harvesting_Period
                            }
                        />

                    </div>

                    {/* YouTube */}

                    {cultivation.youtube_url && (
                        <div className="mt-5 flex flex-col gap-4 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                    <PlayCircle
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Cultivation Tutorial
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        YouTube video available
                                    </p>
                                </div>

                            </div>

                            <a
                                href={
                                    cultivation.youtube_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                <PlayCircle
                                    size={17}
                                />

                                Watch Video
                            </a>

                        </div>
                    )}

                    {/* Steps */}

                    {cultivation.steps?.length > 0 && (
                        <div className="mt-8">

                            <div className="mb-5">

                                <h3 className="text-lg font-semibold text-slate-900">
                                    Cultivation Steps
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Step-by-step cultivation process
                                </p>

                            </div>

                            <div className="space-y-5">

                                {cultivation.steps.map(
                                    (
                                        step,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                step.id ||
                                                index
                                            }
                                            className="overflow-hidden rounded-xl border border-slate-200"
                                        >

                                            {/* Step Header */}

                                            <div className="flex items-start gap-4 bg-slate-50 p-5">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 font-bold text-white">
                                                    {step.stepNumber ||
                                                        index +
                                                            1}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                                                        Step{" "}
                                                        {step.stepNumber ||
                                                            index +
                                                                1}
                                                    </p>

                                                    <h4 className="mt-1 text-base font-semibold text-slate-900">
                                                        {
                                                            step.title
                                                        }
                                                    </h4>

                                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                                        {
                                                            step.description
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Step Details */}

                                            <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">

                                                {/* Practices */}

                                                {step
                                                    .recommendedPractices
                                                    ?.length >
                                                    0 && (
                                                    <div>

                                                        <div className="mb-3 flex items-center gap-2">

                                                            <CheckCircle2
                                                                size={
                                                                    18
                                                                }
                                                                className="text-green-600"
                                                            />

                                                            <h5 className="font-semibold text-slate-800">
                                                                Recommended Practices
                                                            </h5>

                                                        </div>

                                                        <div className="space-y-2">

                                                            {step.recommendedPractices.map(
                                                                (
                                                                    practice,
                                                                    practiceIndex
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            practiceIndex
                                                                        }
                                                                        className="flex items-start gap-2 rounded-lg bg-slate-50 p-3"
                                                                    >
                                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />

                                                                        <p className="text-sm leading-6 text-slate-600">
                                                                            {
                                                                                practice
                                                                            }
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

                                                        <div className="mb-3 flex items-center gap-2">

                                                            <Info
                                                                size={
                                                                    18
                                                                }
                                                                className="text-amber-600"
                                                            />

                                                            <h5 className="font-semibold text-slate-800">
                                                                Important Note
                                                            </h5>

                                                        </div>

                                                        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

                                                            <p className="text-sm leading-6 text-amber-800">
                                                                {
                                                                    step.importantNotes
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                </>
            )}

        </section>
    );
};

export default CultivationSection;