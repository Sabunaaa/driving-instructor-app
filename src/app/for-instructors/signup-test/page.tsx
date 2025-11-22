"use client";

import React from "react";
import { useMultiStepForm } from "@/hooks";
import ModernStepIndicator from "@/components/for-instructors/signup-test/ModernStepIndicator";
import ModernStep1 from "@/components/for-instructors/signup-test/ModernStep1";
import ModernStep2 from "@/components/for-instructors/signup-test/ModernStep2";
import ModernStep3 from "@/components/for-instructors/signup-test/ModernStep3";
import ModernStep4 from "@/components/for-instructors/signup-test/ModernStep4";
import ModernSuccess from "@/components/for-instructors/signup-test/ModernSuccess";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SignupTestPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    vehicleRegistration: "",
    vehicleBrand: "",
    vehicleYear: new Date().getFullYear(),
    transmission: "",
    vehiclePhotos: [] as File[],
    instructorLicense: [] as File[],
    professionalCertificate: null as File | null,
    backgroundCheckConsent: false,
    termsAccepted: false,
    privacyAccepted: false,
  };

  const { 
    currentStep, 
    handleNextStep, 
    handlePreviousStep, 
    handleFormDataChange,
    handleStepChange,
    formData,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm(initialFormData, 4);

  const steps = [
    { number: 1, title: "About You" },
    { number: 2, title: "Vehicle Info" },
    { number: 3, title: "Documents" },
    { number: 4, title: "Review" },
  ];

  const handleDataUpdate = (newData: any) => {
    handleFormDataChange(newData);
    
    // Clear errors for fields that are being updated
    if (Object.keys(errors).length > 0) {
      const newErrors = { ...errors };
      Object.keys(newData).forEach(key => {
        delete newErrors[key];
      });
      setErrors(newErrors);
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (formData.dateOfBirth) {
        const year = parseInt(formData.dateOfBirth.split('-')[0]);
        if (year < 1950 || year > 2026) {
          newErrors.dateOfBirth = "Date of birth must be between 1950 and 2026";
        }
      }
      if (!formData.address) newErrors.address = "Address is required";

      // Name validation (no numbers)
      const nameRegex = /^[a-zA-Z\u10A0-\u10FF\s]*$/;
      if (formData.firstName && !nameRegex.test(formData.firstName)) {
        newErrors.firstName = "First name must contain only letters";
      }
      if (formData.lastName && !nameRegex.test(formData.lastName)) {
        newErrors.lastName = "Last name must contain only letters";
      }

      // Email validation
      if (formData.email && !formData.email.includes('@')) {
        newErrors.email = "Please enter a valid email address";
      }

      // Phone validation
      if (formData.phone) {
        const phoneRaw = formData.phone.replace(/\s/g, '');
        if (!/^\d+$/.test(phoneRaw)) {
          newErrors.phone = "Phone number must contain only numbers";
        } else if (phoneRaw.length !== 9) {
          newErrors.phone = "Phone number must be exactly 9 digits";
        } else if (!phoneRaw.startsWith('5')) {
          newErrors.phone = "Phone number must start with 5";
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.vehicleBrand) newErrors.vehicleBrand = "Vehicle brand is required";
      if (!formData.vehicleRegistration) newErrors.vehicleRegistration = "Registration is required";
      if (!formData.vehicleYear) newErrors.vehicleYear = "Year is required";
      if (!formData.transmission) newErrors.transmission = "Transmission is required";

      // Registration Regex (XX-123-XX)
      const regRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
      if (formData.vehicleRegistration && !regRegex.test(formData.vehicleRegistration)) {
        newErrors.vehicleRegistration = "Format must be XX-123-XX (e.g., AA-123-AA)";
      }

      // Photo Validation
      if (!formData.vehiclePhotos || formData.vehiclePhotos.length === 0) {
        newErrors.vehiclePhotos = "At least one vehicle photo is required";
      }
    }

    if (currentStep === 3) {
      if (!formData.instructorLicense || formData.instructorLicense.length === 0) {
        newErrors.instructorLicense = "Instructor license is required";
      }
    }

    if (currentStep === 4) {
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the Terms & Conditions";
      if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must accept the Privacy Policy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    } else {
      setErrors({});
    }

    return isValid;
  };

  const onNext = () => {
    if (validateStep()) {
      handleNextStep();
    }
  };

  const onSubmit = () => {
    if (validateStep()) {
      setIsSubmitted(true);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <ModernStep1 data={formData} updateData={handleDataUpdate} errors={errors} />;
      case 2: return <ModernStep2 data={formData} updateData={handleDataUpdate} errors={errors} />;
      case 3: return <ModernStep3 data={formData} updateData={handleDataUpdate} errors={errors} />;
      case 4: return <ModernStep4 data={formData} updateData={handleDataUpdate} onEditStep={handleStepChange} errors={errors} />;
      default: return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden p-6">
        <div className="absolute top-0 right-0 w-full h-full bg-[#F03D3D]/10 skew-x-12 transform origin-top-right pointer-events-none" />
        <div className="relative z-10 w-full max-w-2xl">
           <ModernSuccess />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Visual & Info (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/3 bg-[#0F172A] text-white p-12 flex-col justify-between relative overflow-hidden sticky top-0 h-screen">
        <div className="absolute top-0 right-0 w-full h-full bg-[#F03D3D]/10 skew-x-12 transform origin-top-right" />
        
        <div className="relative z-10">
          <Link href="/main" className="text-2xl font-bold tracking-tighter mb-12 block">
            Drive<span className="text-[#F03D3D]">Forward</span>
          </Link>
          
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Join Georgia's fastest growing instructor network.
          </h1>
          <p className="text-gray-400 text-lg">
            Complete your application in minutes and start receiving students as soon as you're verified.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-[#F03D3D]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Be Your Own Boss</h3>
              <p className="text-sm text-gray-400">Work when you want, you choose your schedule</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-[#F03D3D]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Guaranteed Payments</h3>
              <p className="text-sm text-gray-400">Weekly payouts, every time</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-[#F03D3D]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Make a Real Impact</h3>
              <p className="text-sm text-gray-400">Be the hero who helps someone gain their driving freedom</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500">
          © 2025 DriveForward Inc.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 p-6 md:p-12 lg:p-24 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full">
          <div className="mb-8 lg:hidden">
            <Link href="/main" className="text-2xl font-bold tracking-tighter">
              Drive<span className="text-[#F03D3D]">Forward</span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Instructor Application</h2>
          <p className="text-gray-500 mb-8">Please fill in your details accurately.</p>

          <ModernStepIndicator currentStep={currentStep} steps={steps} />

          <div className="bg-white min-h-[400px]">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
            <button
              onClick={handlePreviousStep}
              disabled={isFirstStep}
                className={`
                  flex items-center px-6 py-3 rounded-xl font-medium transition
                  ${isFirstStep 
                    ? "text-gray-300 cursor-not-allowed" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <button
                onClick={isLastStep ? onSubmit : onNext}
                className="flex items-center px-8 py-3 bg-[#F03D3D] text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20"
              >
                {isLastStep ? "Submit Application" : "Continue"}
                {!isLastStep && <ArrowRight className="w-5 h-5 ml-2" />}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignupTestPage;
