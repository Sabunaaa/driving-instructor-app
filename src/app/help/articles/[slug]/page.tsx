"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Book, ChevronRight } from "lucide-react"; // @ts-ignore
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Button from "@/components/ui/Button";
import { getArticleBySlug } from "../data";

export default function HelpArticlePage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const article = slug ? getArticleBySlug(slug) : undefined;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-7xl 2xl:max-w-none">
        <div className="flex gap-8">
          <AccountSidebar activeItem="Help center" />
          <main className="flex-1" aria-label="Help article content">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button
                  className="hover:text-red-600"
                  onClick={() => router.push("/help")}
                >
                  Help
                </button>
                <ChevronRight size={14} />
                <span className="text-gray-700">Article</span>
              </div>
              <Button variant="outline" onClick={() => router.push("/help")}>
                Back to help
              </Button>
            </div>

            {!article ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                  Article not found
                </h1>
                <p className="text-gray-600">
                  We couldn't find that help article.
                </p>
              </div>
            ) : (
              <div
                className="bg-white border border-gray-200 rounded-xl p-6"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Book size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {article.title}
                    </h1>
                    <p className="text-sm text-gray-500">{article.category}</p>
                  </div>
                </div>
                <div className="space-y-5 text-gray-800 leading-relaxed">
                  {article.description && <p>{article.description}</p>}

                  {article.steps && article.steps.length > 0 && (
                    <div>
                      <h2 className="text-base font-semibold text-gray-900 mb-2">
                        Steps
                      </h2>
                      <ol className="list-decimal list-inside space-y-1">
                        {article.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {article.bullets && article.bullets.length > 0 && (
                    <div>
                      <h2 className="text-base font-semibold text-gray-900 mb-2">
                        Details
                      </h2>
                      <ul className="list-disc list-inside space-y-1">
                        {article.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {article.content && article.content.length > 0 && (
                    <div className="space-y-3">
                      {article.content.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}

                  {article.note && (
                    <p className="text-sm text-gray-600">{article.note}</p>
                  )}

                  {article.cta && (
                    <div className="pt-2">
                      <Button
                        onClick={() => {
                          if (article.cta?.external) {
                            window.open(article.cta.href, "_blank");
                          } else if (article.cta?.href) {
                            router.push(article.cta.href);
                          }
                        }}
                        aria-label={`CTA: ${article.cta.label}`}
                      >
                        {article.cta.label}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
