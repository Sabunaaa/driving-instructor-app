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
import DashboardStats from "./components/DashboardStats";
import PaymentsTable from "./components/PaymentsTable";
import LessonsModal from "./components/LessonsModal";

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
              <DashboardStats
                onLessonsCardClick={() => setShowLessonsModal(true)}
              />
            )}

            {/* Recent Payments - Only for instructors */}
            {user.userType === "instructor" && <PaymentsTable />}
          </main>
        </div>
      </div>

      {/* Lessons Modal */}
      <LessonsModal
        isOpen={showLessonsModal}
        onClose={() => setShowLessonsModal(false)}
      />
    </div>
  );
};

export default DashboardPage;
