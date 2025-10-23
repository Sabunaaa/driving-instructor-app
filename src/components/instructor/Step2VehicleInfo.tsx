"use client";

import React from "react";
import { InstructorSignupData } from "@/app/for-instructors/signup/page";
import { Upload, X } from "lucide-react";

interface Step2Props {
  data: InstructorSignupData;
  onChange: (data: Partial<InstructorSignupData>) => void;
}

const Step2VehicleInfo: React.FC<Step2Props> = ({ data, onChange }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      [name]:
        name === "numberOfSeats" || name === "vehicleYear"
          ? parseInt(value) || 0
          : value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      onChange({
        carPhotos: [...data.carPhotos, ...fileArray],
      });
    }
  };

  const removePhoto = (index: number) => {
    onChange({
      carPhotos: data.carPhotos.filter((_, i) => i !== index),
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Information</h2>
      <p className="text-gray-600 mb-8">
        Provide details about your vehicle
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle Registration */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Vehicle Registration Number *
          </label>
          <input
            type="text"
            name="vehicleRegistration"
            value={data.vehicleRegistration}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ABC 1234"
            required
          />
        </div>

        {/* Vehicle Model */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Vehicle Model *
          </label>
          <input
            type="text"
            name="vehicleModel"
            value={data.vehicleModel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Honda Civic"
            required
          />
        </div>

        {/* Vehicle Year */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Vehicle Year *
          </label>
          <select
            name="vehicleYear"
            value={data.vehicleYear}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Transmission Type *
          </label>
          <select
            name="transmissionType"
            value={data.transmissionType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select transmission type</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        {/* Number of Seats */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Number of Seats *
          </label>
          <input
            type="number"
            name="numberOfSeats"
            value={data.numberOfSeats}
            onChange={handleChange}
            min="4"
            max="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Must have at least 4 seats</p>
        </div>

        {/* Insurance Expiry */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Insurance Expiry Date *
          </label>
          <input
            type="date"
            name="insuranceExpiry"
            value={data.insuranceExpiry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Car Photos */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Car Photos *
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Upload clear photos of your vehicle (front, back, interior)
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-blue-500 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="car-photos"
          />
          <label htmlFor="car-photos" className="cursor-pointer">
            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-900 font-medium">Click to upload photos</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
          </label>
        </div>

        {/* Uploaded Photos Preview */}
        {data.carPhotos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.carPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Car photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">{photo.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2VehicleInfo;
