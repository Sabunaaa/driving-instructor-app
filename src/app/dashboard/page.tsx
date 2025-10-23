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
import { Calendar, DollarSign, Star, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard-components/StatCard";
import { PaymentsTable, PaymentRow } from "@/components/dashboard-components/PaymentsTable";
import { LessonsModal } from "@/components/dashboard-components/LessonsModal";
import { LessonCardProps } from "@/components/dashboard-components/LessonCard";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [upcoming, setUpcoming] = React.useState<ReturnType<typeof getUpcoming>>([]);
  const [recent, setRecent] = React.useState<typeof upcoming>([]);
  const [showLessonsModal, setShowLessonsModal] = React.useState(false);
  const [isModalAnimating, setIsModalAnimating] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;
    if (user.userType === "instructor") {
      const list = getLessonsForInstructor(user.id);
      const up = getUpcoming(list);
      setUpcoming(up);
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

  React.useEffect(() => {
    if (showLessonsModal) {
      requestAnimationFrame(() => {
        setIsModalAnimating(true);
      });
    }
  }, [showLessonsModal]);

  const handleCloseModal = () => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setShowLessonsModal(false);
    }, 300);
  };

  const cancelLesson = (id: string) => {
    if (!user) return;
    removeLesson(user.id, id);
    const list = getLessonsForInstructor(user.id);
    setUpcoming(getUpcoming(list));
  };

  const payments: PaymentRow[] = [
    {
      id: "1",
      amount: "$210",
      date: "Feb 17, 2025",
      studentName: "Adam Barber",
      initials: "AB",
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-400",
    },
    {
      id: "2",
      amount: "$180",
      date: "Feb 17, 2025",
      studentName: "Cameron Wilson",
      initials: "CW",
      gradientFrom: "from-blue-400",
      gradientTo: "to-cyan-400",
    },
    {
      id: "3",
      amount: "$150",
      date: "Feb 16, 2025",
      studentName: "Floyd Miles",
      initials: "FM",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-400",
    },
  ];

  const lessonCards: LessonCardProps[] = [
    {
      studentName: "Sarah Johnson",
      lessonType: "Advanced Lesson",
      status: "Confirmed",
      date: "Mon, Feb 17",
      time: "10:00 AM - 11:30 AM",
      gradientFrom: "from-blue-400",
      gradientTo: "to-cyan-400",
    },
    {
      studentName: "Michael Chen",
      lessonType: "Highway Driving",
      status: "Confirmed",
      date: "Tue, Feb 18",
      time: "2:00 PM - 3:00 PM",
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-400",
    },
    {
      studentName: "Emma Davis",
      lessonType: "Parking Practice",
      status: "Pending",
      date: "Wed, Feb 19",
      time: "4:00 PM - 5:00 PM",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-400",
    },
    {
      studentName: "James Wilson",
      lessonType: "Basic Maneuvers",
      status: "Confirmed",
      date: "Thu, Feb 20",
      time: "9:00 AM - 10:00 AM",
      gradientFrom: "from-orange-400",
      gradientTo: "to-red-400",
    },
    {
      studentName: "Olivia Brown",
      lessonType: "City Driving",
      status: "Confirmed",
      date: "Fri, Feb 21",
      time: "1:00 PM - 2:30 PM",
      gradientFrom: "from-pink-400",
      gradientTo: "to-rose-400",
    },
    {
      studentName: "Noah Martinez",
      lessonType: "Night Driving",
      status: "Pending",
      date: "Fri, Feb 21",
      time: "7:00 PM - 8:30 PM",
      gradientFrom: "from-indigo-400",
      gradientTo: "to-purple-400",
    },
  ];

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

            {user.userType === "instructor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                  icon={Calendar}
                  bgColor="bg-purple-50"
                  iconColor="text-purple-600"
                  title="Lessons This Week"
                  value={12}
                  isClickable={true}
                  onClick={() => setShowLessonsModal(true)}
                  badge={{
                    icon: TrendingUp,
                    text: "+5",
                    color: "text-green-600 bg-green-50",
                  }}
                />

                <StatCard
                  icon={DollarSign}
                  bgColor="bg-emerald-50"
                  iconColor="text-emerald-600"
                  title="This Week's Revenue"
                  value="$100"
                  comparison={{
                    label: "Last week",
                    value: "$800",
                  }}
                />

                <StatCard
                  icon={Star}
                  bgColor="bg-amber-50"
                  iconColor="text-amber-500"
                  title="Average Rating"
                  value="4.8"
                  badge={{
                    icon: Star,
                    text: "142 reviews",
                    color: "text-gray-600 bg-gray-50",
                  }}
                />
              </div>
            )}

            {user.userType === "instructor" && (
              <PaymentsTable payments={payments} />
            )}
          </main>
        </div>
      </div>

      <LessonsModal
        isOpen={showLessonsModal}
        isAnimating={isModalAnimating}
        onClose={handleCloseModal}
        lessons={lessonCards}
      />
    </div>
  );
};

export default DashboardPage;
