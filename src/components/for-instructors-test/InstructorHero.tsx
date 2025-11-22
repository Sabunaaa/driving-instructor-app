"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const InstructorHero = () => {
  return (
    <section className="relative bg-[#0F172A] text-white overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#F03D3D]/5 skew-x-12 transform origin-top-right" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 -skew-x-12 transform origin-bottom-left" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F03D3D]/10 border border-[#F03D3D]/20 text-sm font-medium text-[#F03D3D]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F03D3D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F03D3D]"></span>
              </span>
              Accepting New Instructors
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Turn Your Car Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F03D3D] to-orange-500">
                A Business
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Set your own hours, keep 100% of your lesson fees, and manage your entire business from one app. Join the platform built for modern driving instructors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/for-instructors/signup">
                <Button size="lg" className="w-full sm:w-auto rounded-xl shadow-lg shadow-red-500/20">
                  Start Teaching Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-xl border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                Calculate Earnings
              </Button>
            </div>

            <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-8">
              <div>
                <div className="text-3xl font-bold text-white">£45k+</div>
                <div className="text-sm text-gray-500">Avg. Annual Earnings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">0%</div>
                <div className="text-sm text-gray-500">Commission on Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-500">Payout Speed</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl">
              {/* Mock App Interface */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold">Dashboard</h3>
                  <p className="text-gray-500 text-sm">Today, 24 Nov</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800" />
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                      09:00
                    </div>
                    <div>
                      <div className="font-bold">Lesson with Sarah</div>
                      <div className="text-sm text-gray-400">Pick up: 12 High St</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                    CONFIRMED
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-gray-400 font-bold">
                      11:00
                    </div>
                    <div>
                      <div className="font-bold">Lesson with Mike</div>
                      <div className="text-sm text-gray-400">Pick up: Station Rd</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gray-700 text-gray-400 text-xs font-bold">
                    PENDING
                  </div>
                </div>
                
                <div className="bg-[#F03D3D] p-4 rounded-xl mt-6 text-center">
                  <div className="text-sm text-white/80 mb-1">Total Earnings Today</div>
                  <div className="text-3xl font-bold">£140.00</div>
                </div>
              </div>
            </div>
            
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F03D3D] rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default InstructorHero;
