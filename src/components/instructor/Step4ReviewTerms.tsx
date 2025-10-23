"use client";

import React from "react";
import { InstructorSignupData } from "@/app/for-instructors/signup/page";
import { CheckCircle, AlertCircle } from "lucide-react";

interface Step4Props {
  data: InstructorSignupData;
  onChange: (data: Partial<InstructorSignupData>) => void;
}

const Step4ReviewTerms: React.FC<Step4Props> = ({ data, onChange }) => {
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ acceptTerms: e.target.checked });
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ acceptPrivacy: e.target.checked });
  };

  const isFormComplete = () => {
    return (
      data.firstName &&
      data.lastName &&
      data.dateOfBirth &&
      data.city &&
      data.address &&
      data.email &&
      data.phone &&
      data.experience >= 0 &&
      data.vehicleRegistration &&
      data.vehicleModel &&
      data.vehicleYear &&
      data.transmissionType &&
      data.numberOfSeats >= 4 &&
      data.insuranceExpiry &&
      data.carPhotos.length > 0 &&
      data.licenseFile &&
      data.licenseExpiry &&
      data.backgroundCheckConsent &&
      data.acceptTerms &&
      data.acceptPrivacy
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Terms</h2>
      <p className="text-gray-600 mb-8">
        Please review your information and accept the terms
      </p>

      {/* Application Summary */}
      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Application Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div>
            <p className="text-xs text-gray-600 font-medium uppercase mb-3">
              Personal Details
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900">
                <span className="font-medium">Name:</span> {data.firstName} {data.lastName}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Email:</span> {data.email}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Phone:</span> {data.phone}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Experience:</span> {data.experience} years
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Location:</span> {data.city}, {data.address}
              </p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <p className="text-xs text-gray-600 font-medium uppercase mb-3">
              Vehicle Information
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900">
                <span className="font-medium">Model:</span> {data.vehicleModel}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Year:</span> {data.vehicleYear}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Transmission:</span>{" "}
                {data.transmissionType.charAt(0).toUpperCase() +
                  data.transmissionType.slice(1)}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Seats:</span> {data.numberOfSeats}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Registration:</span>{" "}
                {data.vehicleRegistration}
              </p>
            </div>
          </div>
        </div>

        {/* Documents Status */}
        <div className="mt-6 pt-6 border-t border-blue-200">
          <p className="text-xs text-gray-600 font-medium uppercase mb-3">
            Documents
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {data.carPhotos.length > 0 ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <AlertCircle size={18} className="text-red-600" />
              )}
              <span className="text-sm text-gray-900">
                Car Photos ({data.carPhotos.length} uploaded)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {data.licenseFile ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <AlertCircle size={18} className="text-red-600" />
              )}
              <span className="text-sm text-gray-900">Driving License</span>
            </div>
            <div className="flex items-center gap-2">
              {data.certificateFiles.length > 0 ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <AlertCircle size={18} className="text-red-600" />
              )}
              <span className="text-sm text-gray-900">
                Certificates ({data.certificateFiles.length} uploaded)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="space-y-4 mb-8">
        {/* Terms & Conditions */}
        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={data.acceptTerms}
            onChange={handleTermsChange}
            className="mt-1 w-4 h-4 accent-blue-600"
            required
          />
          <div>
            <p className="font-medium text-gray-900">
              I accept the Terms and Conditions *
            </p>
            <p className="text-sm text-gray-600 mt-1">
              I agree to comply with all platform rules, regulations, and agree to
              maintain professional standards as an instructor.
            </p>
          </div>
        </label>

        {/* Privacy Policy */}
        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={data.acceptPrivacy}
            onChange={handlePrivacyChange}
            className="mt-1 w-4 h-4 accent-blue-600"
            required
          />
          <div>
            <p className="font-medium text-gray-900">
              I accept the Privacy Policy *
            </p>
            <p className="text-sm text-gray-600 mt-1">
              I understand and agree to the collection, use, and processing of my
              personal data as described in the privacy policy.
            </p>
          </div>
        </label>
      </div>

      {/* Completion Status */}
      {!isFormComplete() && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">
                Please complete all fields
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                Ensure all required information is filled and all agreements are
                accepted before submitting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Info */}
      {isFormComplete() && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">
                Your application is ready to submit
              </p>
              <p className="text-sm text-green-800 mt-1">
                All required information has been provided. Click submit to complete
                your application.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4ReviewTerms;
