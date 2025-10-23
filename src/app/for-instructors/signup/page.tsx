"use client";

import React from "react";
import { useMultiStepForm } from "@/hooks";
import StepIndicator from "@/components/instructor/StepIndicator";
import Step1PersonalDetails from "@/components/instructor/Step1PersonalDetails";
import Step2VehicleInfo from "@/components/instructor/Step2VehicleInfo";
import Step3Documents from "@/components/instructor/Step3Documents";
import Step4ReviewTerms from "@/components/instructor/Step4ReviewTerms";

export interface InstructorSignupData {
  // Step 1
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  experience: number;

  // Step 2
  vehicleRegistration: string;
  vehicleModel: string;
  vehicleYear: number;
  transmissionType: "manual" | "automatic" | "";
  numberOfSeats: number;
  insuranceExpiry: string;
  carPhotos: File[];

  // Step 3
  licenseFile: File | null;
  licenseExpiry: string;
  certificateFiles: File[];
  backgroundCheckConsent: boolean;

  // Step 4
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

const InstructorSignupPage = () => {
  const initialFormData: InstructorSignupData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    experience: 0,
    vehicleRegistration: "",
    vehicleModel: "",
    vehicleYear: new Date().getFullYear(),
    transmissionType: "",
    numberOfSeats: 4,
    insuranceExpiry: "",
    carPhotos: [],
    licenseFile: null,
    licenseExpiry: "",
    certificateFiles: [],
    backgroundCheckConsent: false,
    acceptTerms: false,
    acceptPrivacy: false,
  };

  const { 
    currentStep, 
    handleNextStep, 
    handlePreviousStep, 
    handleStepChange, 
    handleFormDataChange,
    resetForm,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm(initialFormData, 4);

  const [formData, setFormData] = React.useState<InstructorSignupData>(initialFormData);

  // Update the hook's form data when local state changes
  React.useEffect(() => {
    handleFormDataChange(formData);
  }, [formData, handleFormDataChange]);

  const handleSubmit = () => {
    console.log("Final submission:", formData);
    // TODO: Send to backend
    alert("Application submitted successfully!");
  };

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Vehicle Information" },
    { number: 3, title: "Documents" },
    { number: 4, title: "Review & Terms" },
  ];

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Become an Instructor
          </h1>
        </div>

        {/* Main Container with Sidebar */}
        <div className="flex gap-8">
          {/* Left Sidebar - Steps */}
          <div className="w-48 flex-shrink-0">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepChange}
            />
          </div>

          {/* Right Content - Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-h-[calc(100vh-250px)] overflow-y-auto">
          {currentStep === 1 && (
            <Step1PersonalDetails
              data={formData}
              onChange={handleFormDataChange}
            />
          )}

          {currentStep === 2 && (
            <Step2VehicleInfo data={formData} onChange={handleFormDataChange} />
          )}

          {currentStep === 3 && (
            <Step3Documents data={formData} onChange={handleFormDataChange} />
          )}

          {currentStep === 4 && (
            <Step4ReviewTerms
              data={formData}
              onChange={handleFormDataChange}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Application
              </button>
            )}
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSignupPage;
