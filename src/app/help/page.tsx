"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
//@ts-ignore
import {
  Search,
  Book,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  HelpCircle,
  Users,
  Car,
  Calendar,
  CreditCard,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";

const HelpPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const helpCategories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      articles: [
        "Setting up your profile",
        "How to book lessons",
        "Payment methods",
      ],
    },
    {
      icon: Car,
      title: "For Instructors",
      description: "Resources for driving instructors",
      articles: [
        "Managing students",
        "Setting availability",
        "Vehicle requirements",
      ],
    },
    {
      icon: Calendar,
      title: "Booking & Scheduling",
      description: "Help with lessons and appointments",
      articles: ["Canceling lessons", "Rescheduling", "No-show policy"],
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Payment issues and billing questions",
      articles: ["Payment methods", "Refund policy", "Invoice questions"],
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Safety guidelines and security features",
      articles: ["Safety protocols", "Account security", "Reporting issues"],
    },
    {
      icon: HelpCircle,
      title: "Technical Support",
      description: "App issues and technical problems",
      articles: ["App not working", "Login problems", "Browser compatibility"],
    },
  ];

  const popularArticles = [
    "How to book your first driving lesson",
    "What to expect during lessons",
    "Cancellation and refund policy",
    "How to become an instructor",
    "Payment and billing FAQ",
    "Safety guidelines for students",
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: true,
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      action: "Send Email",
      available: true,
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our support line",
      action: "Call Now",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Account Sidebar */}
          <AccountSidebar activeItem="Help center" />

          {/* Main Content */}
          <main className="flex-1">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  How can we help you?
                </h1>
                <p className="text-gray-600 mb-8">
                  Find answers to your questions or get in touch with our
                  support team
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Help Categories */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {helpCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Icon size={24} className="text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {category.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {category.description}
                            </p>
                            <div className="space-y-1">
                              {category.articles.map(
                                (article, articleIndex) => (
                                  <div
                                    key={articleIndex}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 cursor-pointer"
                                  >
                                    <ChevronRight size={14} />
                                    <span>{article}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Popular Articles */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Popular Articles
                </h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                  {popularArticles.map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Book size={16} className="text-gray-400" />
                        <span className="text-gray-900">{article}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Contact Support
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
                      >
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon size={24} className="text-red-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {option.description}
                        </p>
                        <button
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            option.available
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!option.available}
                        >
                          {option.action}
                        </button>
                        {!option.available && (
                          <p className="text-xs text-gray-400 mt-2">
                            Currently unavailable
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>
                    • Check your email for booking confirmations and updates
                  </li>
                  <li>
                    • Keep your profile information up to date for better
                    matches
                  </li>
                  <li>
                    • Cancel lessons at least 24 hours in advance to avoid fees
                  </li>
                  <li>
                    • Rate your instructor after each lesson to help others
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
