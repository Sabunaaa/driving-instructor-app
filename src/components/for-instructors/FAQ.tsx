"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    question: "How much does it cost to join?",
    answer: "Creating a profile is completely free. We only charge a small commission fee on completed bookings. There are no monthly subscription fees or hidden costs."
  },
  {
    question: "When do I get paid?",
    answer: "Payments are processed weekly. Earnings from completed lessons are transferred directly to your bank account every Monday for the previous week's work."
  },
  {
    question: "Can I set my own prices?",
    answer: "Yes, absolutely! You have full control over your hourly rates and package prices. You can adjust them at any time through your dashboard."
  },
  {
    question: "What documents do I need?",
    answer: "You'll need a valid driving instructor license, proof of vehicle insurance, and a clean background check. We'll guide you through the verification process."
  },
  {
    question: "How does the calendar work?",
    answer: "You set your availability in our calendar system. Students can only book slots that you've marked as available. You can sync it with your personal calendar too."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about becoming an instructor.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#F03D3D]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
