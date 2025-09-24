"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { ImageUp, FileUp } from "lucide-react";

export default function InstructorVehiclePage() {
  const [makeModel, setMakeModel] = useState("");
  const [year, setYear] = useState("");
  const [license, setLicense] = useState("");
  const [vehiclePhotos, setVehiclePhotos] = useState<FileList | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!makeModel || !year || !license) {
      setError("Please complete all text fields.");
      return;
    }
    if (!vehiclePhotos?.length || !insurance) {
      setError("Please add vehicle photos and an insurance document.");
      return;
    }

    const data = new FormData();
    data.append("makeModel", makeModel);
    data.append("year", year);
    data.append("license", license);
    Array.from(vehiclePhotos).forEach((f) => data.append("vehiclePhotos", f));
    data.append("insurance", insurance);

    try {
      setSubmitting(true);
      const res = await fetch("/api/vehicle/verification", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Upload failed");
      setMessage("Submitted! We'll review your documents shortly.");
      // reset form
      setMakeModel("");
      setYear("");
      setLicense("");
      setVehiclePhotos(null);
      setInsurance(null);
      // Also clear file inputs visually (handled via key on form wrapper)
      setFormKey((k) => k + 1);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  // key bump to reset uncontrolled file inputs
  const [formKey, setFormKey] = useState(0);

  const photoSummary = useMemo(() => {
    if (!vehiclePhotos?.length) return "";
    const names = Array.from(vehiclePhotos).map((f) => f.name);
    return names.length <= 2
      ? names.join(", ")
      : `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
  }, [vehiclePhotos]);

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vehicle Verification
        </h1>
        <p className="text-gray-600 mb-6">
          Upload documents and photos for approval.
        </p>
        <form
          key={formKey}
          onSubmit={onSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Make & model"
              value={makeModel}
              onChange={(e) => setMakeModel(e.target.value)}
            />
            <input
              className="border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2"
              placeholder="License plate"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle photos
            </label>
            <input
              id="veh-photos"
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => setVehiclePhotos(e.target.files)}
            />
            <Button asChild variant="outline" size="md">
              <label
                htmlFor="veh-photos"
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <ImageUp className="h-4 w-4" />
                {vehiclePhotos?.length ? "Change photos" : "Choose photos"}
              </label>
            </Button>
            <div className="mt-1 text-xs text-gray-500">
              {vehiclePhotos?.length ? (
                <span>
                  {vehiclePhotos.length} selected
                  {photoSummary ? ` — ${photoSummary}` : ""}
                </span>
              ) : (
                <span>PNG, JPG up to a few MB each</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance document
            </label>
            <input
              id="veh-insurance"
              type="file"
              accept="application/pdf,image/*"
              className="sr-only"
              onChange={(e) => setInsurance(e.target.files?.[0] || null)}
            />
            <Button asChild variant="outline" size="md">
              <label
                htmlFor="veh-insurance"
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <FileUp className="h-4 w-4" />
                {insurance ? "Change document" : "Choose document"}
              </label>
            </Button>
            <div className="mt-1 text-xs text-gray-500">
              {insurance ? (
                <span>{insurance.name}</span>
              ) : (
                <span>PDF or image</span>
              )}
            </div>
          </div>
          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          {message ? (
            <div className="text-sm text-green-600">{message}</div>
          ) : null}
          <Button disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for review"}
          </Button>
        </form>
      </div>
    </main>
  );
}
