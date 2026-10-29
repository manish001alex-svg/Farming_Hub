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

const CultivationForm = ({
    form,
    editing,
    submitting,
    error,
    onChange,
    onStepChange,
    onAddStep,
    onRemoveStep,
    onAddPractice,
    onPracticeChange,
    onRemovePractice,
    onStepImagesChange,
    onRemoveStepImage,
    onSubmit,
    onCancel,
}) => {

    return (
        <section className="rounded-2xl border border-green-200 bg-white p-5 shadow-sm md:p-6">

            {/* Form Header */}

            <div className="mb-6 flex items-start justify-between gap-4">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <Sprout size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                {editing
                                    ? "Edit Cultivation"
                                    : "Add Cultivation"}
                            </h2>

                            <p className="text-sm text-slate-500">
                                Add cultivation information and step-by-step instructions.
                            </p>
                        </div>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    <X size={20} />
                </button>

            </div>

            {/* Error */}

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            <form
                onSubmit={onSubmit}
                className="space-y-8"
            >

                {/* ================================================= */}
                {/* BASIC CULTIVATION INFORMATION */}
                {/* ================================================= */}

                <div>

                    <h3 className="mb-4 text-base font-semibold text-slate-900">
                        Cultivation Information
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <FormInput
                            label="Sowing Time"
                            value={
                                form.showing_time
                            }
                            placeholder="Example: November"
                            onChange={(value) =>
                                onChange(
                                    "showing_time",
                                    value
                                )
                            }
                            required
                        />

                        <FormInput
                            label="Growing Duration"
                            value={
                                form.growing_Duration
                            }
                            placeholder="Example: 120 days"
                            onChange={(value) =>
                                onChange(
                                    "growing_Duration",
                                    value
                                )
                            }
                            required
                        />

                        <FormInput
                            label="Harvesting Period"
                            value={
                                form.harvesting_Period
                            }
                            placeholder="Example: March"
                            onChange={(value) =>
                                onChange(
                                    "harvesting_Period",
                                    value
                                )
                            }
                            required
                        />

                        <FormInput
                            label="YouTube URL"
                            value={
                                form.youtube_url
                            }
                            placeholder="https://www.youtube.com/watch?v=..."
                            onChange={(value) =>
                                onChange(
                                    "youtube_url",
                                    value
                                )
                            }
                        />

                    </div>

                </div>

                {/* ================================================= */}
                {/* STEPS */}
                {/* ================================================= */}

                <div>

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h3 className="text-base font-semibold text-slate-900">
                                Cultivation Steps
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Add multiple steps for cultivating this crop.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onAddStep}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            <Plus size={17} />

                            Add Step
                        </button>

                    </div>

                    {/* No Steps */}

                    {form.steps.length ===
                        0 && (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                            <p className="text-sm text-slate-500">
                                No cultivation steps added yet.
                            </p>

                            <button
                                type="button"
                                onClick={
                                    onAddStep
                                }
                                className="mt-3 text-sm font-semibold text-green-600 hover:text-green-700"
                            >
                                + Add first step
                            </button>

                        </div>
                    )}

                    <div className="space-y-6">

                        {form.steps.map(
                            (
                                step,
                                stepIndex
                            ) => (
                                <div
                                    key={
                                        step.id ||
                                        stepIndex
                                    }
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                >

                                    {/* Step Header */}

                                    <div className="mb-5 flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-sm font-bold text-white">
                                                {step.stepNumber}
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-slate-800">
                                                    Step{" "}
                                                    {
                                                        step.stepNumber
                                                    }
                                                </h4>

                                                <p className="text-xs text-slate-500">
                                                    Cultivation instruction
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onRemoveStep(
                                                    stepIndex
                                                )
                                            }
                                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                        >
                                            <Trash2
                                                size={
                                                    16
                                                }
                                            />

                                            Remove
                                        </button>

                                    </div>

                                    {/* Step Fields */}

                                    <div className="grid grid-cols-1 gap-5">

                                        <FormInput
                                            label="Step Title"
                                            value={
                                                step.title
                                            }
                                            placeholder="Example: Land Preparation"
                                            onChange={(
                                                value
                                            ) =>
                                                onStepChange(
                                                    stepIndex,
                                                    "title",
                                                    value
                                                )
                                            }
                                            required
                                        />

                                        <FormTextarea
                                            label="Description"
                                            value={
                                                step.description
                                            }
                                            placeholder="Describe what should be done in this step..."
                                            onChange={(
                                                value
                                            ) =>
                                                onStepChange(
                                                    stepIndex,
                                                    "description",
                                                    value
                                                )
                                            }
                                            required
                                        />

                                        {/* Recommended Practices */}

                                        <div>

                                            <div className="mb-3 flex items-center justify-between">

                                                <label className="text-sm font-semibold text-slate-700">
                                                    Recommended Practices
                                                </label>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onAddPractice(
                                                            stepIndex
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                                                >
                                                    <Plus
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    Add Practice
                                                </button>

                                            </div>

                                            <div className="space-y-2">

                                                {step
                                                    .recommendedPractices
                                                    .length ===
                                                    0 && (
                                                    <p className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-400">
                                                        No recommended practices added.
                                                    </p>
                                                )}

                                                {step.recommendedPractices.map(
                                                    (
                                                        practice,
                                                        practiceIndex
                                                    ) => (
                                                        <div
                                                            key={
                                                                practiceIndex
                                                            }
                                                            className="flex items-center gap-2"
                                                        >

                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                                                <CheckCircle2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </div>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    practice
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    onPracticeChange(
                                                                        stepIndex,
                                                                        practiceIndex,
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Enter recommended practice"
                                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onRemovePractice(
                                                                        stepIndex,
                                                                        practiceIndex
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </button>

                                                        </div>
                                                    )
                                                )}

                                            </div>

                                        </div>

                                        {/* Important Notes */}

                                        <FormTextarea
                                            label="Important Notes"
                                            value={
                                                step.importantNotes
                                            }
                                            placeholder="Add any important warning or special instruction..."
                                            onChange={(
                                                value
                                            ) =>
                                                onStepChange(
                                                    stepIndex,
                                                    "importantNotes",
                                                    value
                                                )
                                            }
                                        />

                                        {/* Step Images */}

                                        <div>

                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Step Images
                                            </label>

                                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 transition hover:border-green-400 hover:bg-green-50/30">

                                                <ImagePlus
                                                    size={
                                                        28
                                                    }
                                                    className="text-green-600"
                                                />

                                                <p className="mt-2 text-sm font-medium text-slate-700">
                                                    Add step images
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    You can select multiple images
                                                </p>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                    onChange={(
                                                        event
                                                    ) => {
                                                        onStepImagesChange(
                                                            stepIndex,
                                                            event
                                                                .target
                                                                .files
                                                        );

                                                        event.target.value =
                                                            "";
                                                    }}
                                                />

                                            </label>

                                            {/* Selected Images */}

                                            {step.stepImages
                                                ?.length >
                                                0 && (
                                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                                    {step.stepImages.map(
                                                        (
                                                            image,
                                                            imageIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    imageIndex
                                                                }
                                                                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
                                                            >

                                                                {image instanceof
                                                                File ? (
                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            image
                                                                        )}
                                                                        alt={`Step ${
                                                                            step.stepNumber
                                                                        } image ${
                                                                            imageIndex +
                                                                            1
                                                                        }`}
                                                                        className="aspect-square w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            image.imageUrl
                                                                        }
                                                                        alt={`Step ${
                                                                            step.stepNumber
                                                                        } image ${
                                                                            imageIndex +
                                                                            1
                                                                        }`}
                                                                        className="aspect-square w-full object-cover"
                                                                    />
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        onRemoveStepImage(
                                                                            stepIndex,
                                                                            imageIndex
                                                                        )
                                                                    }
                                                                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                                                                >
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </button>

                                                            </div>
                                                        )
                                                    )}

                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={
                            submitting
                        }
                        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={
                            submitting
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {submitting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                                Saving...
                            </>
                        ) : (
                            <>
                                <Save
                                    size={17}
                                />

                                {editing
                                    ? "Update Cultivation"
                                    : "Save Cultivation"}
                            </>
                        )}

                    </button>

                </div>

            </form>

        </section>
    );
};

/* =========================================================
   FORM INPUT
========================================================= */

const FormInput = ({
    label,
    value,
    placeholder,
    onChange,
    required = false,
}) => {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

        </div>
    );
};


/* =========================================================
   FORM TEXTAREA
========================================================= */

const FormTextarea = ({
    label,
    value,
    placeholder,
    onChange,
    required = false,
}) => {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <textarea
                rows={4}
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

        </div>
    );
};


export default CultivationForm;