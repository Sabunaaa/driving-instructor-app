"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FolderOpen, ChevronRight, Book } from "lucide-react"; // @ts-ignore
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Button from "@/components/ui/Button";
import { getArticlesByCategory, getCategoryDisplay } from "../../articles/data";

export default function HelpCategoryPage() {
  const router = useRouter();
  const params = useParams<{ category: string }>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const categorySlug = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;
  const displayName = categorySlug ? getCategoryDisplay(categorySlug) : null;
  const articles = categorySlug ? getArticlesByCategory(categorySlug) : [];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-7xl 2xl:max-w-none">
        <div className="flex gap-8">
          <AccountSidebar activeItem="Help center" />
          <main className="flex-1" aria-label="Help category content">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button
                  className="hover:text-red-600"
                  onClick={() => router.push("/help")}
                >
                  Help
                </button>
                <ChevronRight size={14} />
                <span className="text-gray-700">
                  {displayName || "Category"}
                </span>
              </div>
              <Button variant="outline" onClick={() => router.push("/help")}>
                Back to help
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <FolderOpen size={20} className="text-red-600" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {displayName || "Category"}
                </h1>
              </div>

              {articles.length === 0 ? (
                <p className="text-gray-600">No articles available.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {articles.map((a) => (
                    <button
                      key={a.slug}
                      onClick={() => router.push(`/help/articles/${a.slug}`)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Book size={16} className="text-gray-400" />
                        <span className="text-gray-900">{a.title}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
