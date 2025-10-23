"use client";

import React from "react";
import { InstructorSignupData } from "@/app/for-instructors/signup/page";
import { Upload, X, CheckCircle } from "lucide-react";

interface Step3Props {
  data: InstructorSignupData;
  onChange: (data: Partial<InstructorSignupData>) => void;
}

const Step3Documents: React.FC<Step3Props> = ({ data, onChange }) => {
  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ licenseFile: file });
    }
  };

  const handleLicenseExpiryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ licenseExpiry: e.target.value });
  };

  const handleCertificatesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      onChange({
        certificateFiles: [...data.certificateFiles, ...fileArray],
      });
    }
  };

  const removeCertificate = (index: number) => {
    onChange({
      certificateFiles: data.certificateFiles.filter((_, i) => i !== index),
    });
  };

  const handleConsentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ backgroundCheckConsent: e.target.checked });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents & Verification</h2>
      <p className="text-gray-600 mb-8">
        Upload your driving license and certificates
      </p>

      {/* Driving License */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Driving License *
        </h3>

        {/* License Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Upload License Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleLicenseUpload}
              className="hidden"
              id="license-file"
            />
            <label htmlFor="license-file" className="cursor-pointer">
              <Upload className="mx-auto mb-2 text-gray-400" size={24} />
              <p className="text-gray-900 font-medium">Click to upload</p>
              <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
            </label>
          </div>
          {data.licenseFile && (
            <div className="mt-3 flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />
              <span className="text-sm">{data.licenseFile.name}</span>
            </div>
          )}
        </div>

        {/* License Expiry */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            License Expiry Date *
          </label>
          <input
            type="date"
            value={data.licenseExpiry}
            onChange={handleLicenseExpiryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Certificates */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Professional Certificates *
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload any teaching or instructor certificates you have
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer mb-4">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleCertificatesUpload}
            className="hidden"
            id="certificates-file"
          />
          <label htmlFor="certificates-file" className="cursor-pointer">
            <Upload className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-gray-900 font-medium">Click to upload</p>
            <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB each</p>
          </label>
        </div>

        {data.certificateFiles.length > 0 && (
          <div className="space-y-2">
            {data.certificateFiles.map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900 truncate">{cert.name}</span>
                </div>
                <button
                  onClick={() => removeCertificate(index)}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Background Check Consent */}
      <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.backgroundCheckConsent}
            onChange={handleConsentChange}
            className="mt-1 w-4 h-4 accent-blue-600"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Background Check Consent *
            </p>
            <p className="text-sm text-gray-600 mt-1">
              I consent to a background check and verification of my documents as
              part of the instructor application process.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Step3Documents;
