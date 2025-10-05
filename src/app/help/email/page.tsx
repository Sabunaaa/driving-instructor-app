"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { Mail, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Button from "@/components/ui/Button";

export default function HelpEmailPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could call an API route. For now, simulate success
    setTimeout(() => setSent(true), 500);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex gap-8">
          <AccountSidebar activeItem="Help center" />
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Mail size={20} className="text-red-600" />
                </span>
                Email Support
              </h1>
              <p className="text-sm text-gray-500">We reply within 24 hours.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2
                    size={48}
                    className="text-green-600 mx-auto mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Message sent
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our team will email you at {user?.email || "your address"}{" "}
                    soon.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/help")}
                  >
                    Back to help
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, subject: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Brief summary of your issue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Describe the issue you're facing"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Send email</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/help")}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
