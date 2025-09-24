"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import { ArrowLeft, Send } from "lucide-react";

type ChatMsg = {
  id: string;
  sender: "instructor" | "student";
  text: string;
  ts: number;
};

// Wrapper to satisfy Next.js requirement: useSearchParams must be under Suspense
export default function StudentMessagePage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading chat…</div>}>
      <StudentMessageInner />
    </Suspense>
  );
}

function StudentMessageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const studentName = params.get("student") || "Student";
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const storageKey = useMemo(() => {
    const uid = user?.id || "guest";
    const s = studentName.toLowerCase().replace(/\s+/g, "-");
    return `instructor_chat_${uid}_${s}`;
  }, [user?.id, studentName]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMsgs(JSON.parse(raw));
      else
        setMsgs([
          {
            id: "hello",
            sender: "student",
            text: `Hi! I'm ${studentName}. I'd like to confirm lesson details.`,
            ts: Date.now(),
          },
        ]);
    } catch {}
  }, [storageKey, studentName]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(msgs));
    } catch {}
  }, [msgs, storageKey]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [msgs]);

  if (!user) return null;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const m: ChatMsg = {
      id: `${Date.now()}`,
      sender: "instructor",
      text,
      ts: Date.now(),
    };
    setMsgs((list) => [...list, m]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-3xl">
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:underline"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Message {studentName}
        </h1>

        <div className="bg-white border border-gray-200 rounded-xl mt-4 h-[60vh] flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "instructor" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                    m.sender === "instructor"
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Write a message..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button onClick={send} disabled={!input.trim()}>
              <div className="flex items-center gap-2">
                <Send size={16} /> Send
              </div>
            </Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Tip: Use the Schedule button on Your Students to create a lesson.
        </div>
      </div>
    </main>
  );
}
