"use client";

import React from "react";
// @ts-ignore
import { Phone, Mail, User, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Contact Section */}
      <div className="max-w-[1296px] 2xl:max-w-none 3xl:max-w-none mx-auto px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-28">
        <div className="flex gap-[134px] items-start">
          {/* Left Side - Contact Info */}
          <div className="w-[526px]">
            {/* Main Text */}
            <div className="mb-12">
              <h1 className="text-[64px] font-bold leading-[76px] text-[#111827] mb-6">
                Contact us
              </h1>
              <p className="text-base text-[#4E5562] leading-6 w-[469px]">
                Write to us if you have any difficulties in working with the
                service. We are open to communication and want to know more
                about those who trust us.
              </p>
            </div>

            {/* Support Section */}
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-[84px] h-[84px] rounded-full border-3 border-white overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <User size={40} className="text-white" />
                  </div>
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#3D7A81] rounded-full border-2 border-white"></div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Questions?
                </h3>
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-[#4E5562]">
                    Give us a call right now
                  </span>
                  <span className="text-sm font-semibold text-[#333D4C]">
                    (406) 555-0120
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-[636px]">
            <div className="bg-white rounded-2xl border-[5px] border-[#EEF1F6] p-12">
              <h2 className="text-2xl font-semibold text-[#111827] mb-6">
                Get in touch!
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Input */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full name *"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-[18px] py-3 border border-[#CAD0D9] rounded-lg text-base placeholder-[#9CA3AF] focus:outline-none focus:border-[#D85151] transition-colors"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-[18px] py-3 border border-[#CAD0D9] rounded-lg text-base placeholder-[#9CA3AF] focus:outline-none focus:border-[#D85151] transition-colors"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your message *"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-[18px] py-3 border border-[#CAD0D9] rounded-lg text-base placeholder-[#9CA3AF] focus:outline-none focus:border-[#D85151] transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#F03D3D] border border-[#F03D3D] text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-colors"
                >
                  Submit form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
