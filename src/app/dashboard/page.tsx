"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import {
  getLessonsForInstructor,
  getUpcoming,
  removeLesson,
} from "@/lib/lessons";
import { Calendar, DollarSign, Star, TrendingUp, CreditCard, User, ChevronDown, X, Clock } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // IMPORTANT: Hooks must run unconditionally on every render.
  // Keep state/effects above any early returns.
  const [upcoming, setUpcoming] = React.useState<
    ReturnType<typeof getUpcoming>
  >([]);
  const [recent, setRecent] = React.useState<typeof upcoming>([]);
  const [showLessonsModal, setShowLessonsModal] = React.useState(false);
  const [isModalAnimating, setIsModalAnimating] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;
    if (user.userType === "instructor") {
      const list = getLessonsForInstructor(user.id);
      const up = getUpcoming(list);
      setUpcoming(up);
      // If none upcoming, show up to 3 most recent past lessons as context
      if (up.length === 0 && list.length > 0) {
        const nowTs = Date.now();
        const past = list
          .filter((l) => new Date(`${l.date}T${l.time}`).getTime() < nowTs)
          .sort(
            (a, b) =>
              new Date(`${b.date}T${b.time}`).getTime() -
              new Date(`${a.date}T${a.time}`).getTime()
          )
          .slice(0, 3);
        setRecent(past);
      } else {
        setRecent([]);
      }
    }
  }, [user]);

  const cancelLesson = (id: string) => {
    if (!user) return;
    removeLesson(user.id, id);
    const list = getLessonsForInstructor(user.id);
    setUpcoming(getUpcoming(list));
  };

  const handleCloseModal = () => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setShowLessonsModal(false);
    }, 300); // Match the animation duration
  };

  React.useEffect(() => {
    if (showLessonsModal) {
      // Trigger opening animation on next frame
      requestAnimationFrame(() => {
        setIsModalAnimating(true);
      });
    }
  }, [showLessonsModal]);


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

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="Dashboard" />
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                {user.userType === "student"
                  ? "Ready to continue your driving journey?"
                  : "Manage your students and lessons from your dashboard."}
              </p>
            </div>

            {/* Stats Cards - Only for instructors */}
            {user.userType === "instructor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Lessons This Week */}
                <button
                  onClick={() => setShowLessonsModal(true)}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow text-left w-full cursor-pointer hover:border-purple-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +5
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
                  <p className="text-sm text-gray-600">Lessons This Week</p>
                </button>

                {/* Weekly Revenue */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">$100</h3>
                  <p className="text-sm text-gray-600 mb-3">This Week's Revenue</p>
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Last week:</span>
                      <span className="font-semibold text-gray-900">$800</span>
                    </div>
                  </div>
                </div>

                {/* Average Rating */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                      142 reviews
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-1">
                    4.8
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </h3>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            )}

            {/* Recent Payments - Only for instructors */}
            {user.userType === "instructor" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Recent payments received</h2>
                      </div>

                {/* Table Header */}
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                    <div className="col-span-4">Amount</div>
                    <div className="col-span-4 flex items-center gap-1">
                      Date
                      <ChevronDown className="w-4 h-4" />
                              </div>
                    <div className="col-span-4">Student</div>
                              </div>
                            </div>

                {/* February 2025 Section */}
                <div>
                  <div className="px-6 py-3 bg-gray-50">
                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <ChevronDown className="w-4 h-4" />
                      February 2025
                    </button>
                  </div>

                  {/* Payment Row 1 */}
                  <div className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <span className="text-sm text-gray-900 font-semibold">$210</span>
                          </div>
                      <div className="col-span-4 text-sm text-gray-600">
                        Feb 17, 2025
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Adam Barber</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Row 2 */}
                  <div className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <span className="text-sm text-gray-900 font-semibold">$180</span>
                      </div>
                      <div className="col-span-4 text-sm text-gray-600">
                        Feb 17, 2025
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Cameron Wilson</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Row 3 */}
                  <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <span className="text-sm text-gray-900 font-semibold">$150</span>
                          </div>
                      <div className="col-span-4 text-sm text-gray-600">
                        Feb 16, 2025
                          </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Floyd Miles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Lessons Modal */}
      {showLessonsModal && (
        <div 
          className={`fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 ease-out ${
            isModalAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden transition-all duration-300 ease-out ${
              isModalAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Lessons This Week</h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section - Left Side */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl p-6 h-full border border-gray-100">
                    {/* Chart Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <span>14 - 25 Aug 2020</span>
                        <Calendar className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="relative h-[400px]">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
                        <span>+60k</span>
                        <span>50k</span>
                        <span>40k</span>
                        <span>30k</span>
                        <span>20k</span>
                        <span>10k</span>
                        <span>0</span>
                      </div>

                      {/* Chart container */}
                      <div className="absolute left-12 right-0 top-0 bottom-0">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-8">
                          <div className="border-t border-gray-100"></div>
                          <div className="border-t border-gray-100"></div>
                          <div className="border-t border-gray-100"></div>
                          <div className="border-t border-gray-100"></div>
                          <div className="border-t border-gray-100"></div>
                          <div className="border-t border-gray-100"></div>
                          <div className="border-t border-gray-100"></div>
                        </div>

                        {/* SVG Chart */}
                        <svg className="w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="none">
                          {/* Smooth curve path */}
                          <path
                            d="M 0 300 Q 50 280 100 250 Q 150 200 200 150 Q 250 120 300 110 Q 350 105 400 110 Q 450 115 500 120 Q 550 160 600 140 Q 650 80 700 50"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {/* End point circle */}
                          <circle cx="700" cy="50" r="6" fill="#000000" />
                          {/* Vertical dashed line at end */}
                          <line
                            x1="700"
                            y1="50"
                            x2="700"
                            y2="360"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lessons Cards - Right Side */}
                <div className="lg:col-span-1 space-y-2 overflow-y-auto max-h-[calc(85vh-160px)] pr-2">
                  {/* Lesson Card 1 */}
                  <div className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Sarah Johnson</h3>
                        <p className="text-xs text-gray-500">Advanced Lesson</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Mon, Feb 17</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10:00 AM - 11:30 AM</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Card 2 */}
                <div className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Michael Chen</h3>
                        <p className="text-xs text-gray-500">Highway Driving</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Tue, Feb 18</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>2:00 PM - 3:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Card 3 */}
                <div className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Emma Davis</h3>
                        <p className="text-xs text-gray-500">Parking Practice</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Wed, Feb 19</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>4:00 PM - 5:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Card 4 */}
                <div className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                  <div>
                        <h3 className="font-semibold text-sm text-gray-900">James Wilson</h3>
                        <p className="text-xs text-gray-500">Basic Maneuvers</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Thu, Feb 20</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>9:00 AM - 10:00 AM</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Card 5 */}
                <div className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Olivia Brown</h3>
                        <p className="text-xs text-gray-500">City Driving</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Fri, Feb 21</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>1:00 PM - 2:30 PM</span>
                    </div>
                </div>
              </div>

                {/* Lesson Card 6 */}
                <div className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Noah Martinez</h3>
                        <p className="text-xs text-gray-500">Night Driving</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Fri, Feb 21</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>7:00 PM - 8:30 PM</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
