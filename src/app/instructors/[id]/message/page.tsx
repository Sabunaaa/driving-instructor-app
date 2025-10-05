"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "instructor";
  text: string;
  ts: number;
};

export default function MessageInstructor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useAuth();
  // Next.js 15: unwrap params Promise in client
  const { id: instructorId } = React.use(params);

  const storageKey = useMemo(() => {
    const uid = user?.id || "guest";
    return `chat_${uid}_${instructorId}`;
  }, [user?.id, instructorId]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [typing, setTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState<number>(Date.now());
  const [composerHint, setComposerHint] = useState("");

  // Presence (mock online/offline)
  const [online, setOnline] = useState<boolean>(() => Math.random() > 0.3);
  useEffect(() => {
    const iv = setInterval(() => setOnline(Math.random() > 0.3), 60000);
    return () => clearInterval(iv);
  }, []);

  // Availability (mock)
  const availability = useMemo(() => {
    const base1 = [
      "Oct 5, 10:00 AM",
      "Oct 5, 12:00 PM",
      "Oct 6, 9:00 AM",
      "Oct 6, 2:00 PM",
      "Oct 7, 5:00 PM",
      "Oct 8, 11:00 AM",
    ];
    const base2 = [
      "Oct 6, 2:00 PM",
      "Oct 7, 10:00 AM",
      "Oct 7, 4:00 PM",
      "Oct 8, 1:00 PM",
      "Oct 9, 6:00 PM",
      "Oct 10, 9:00 AM",
    ];
    return String(instructorId) === "2" ? base2 : base1;
  }, [instructorId]);

  // Pricing (mock – kept in sync with profile page)
  type PackageType = "private" | "group" | "online";
  const pricing = useMemo(() => {
    return String(instructorId) === "2"
      ? { private: 60, group: 35, online: 45 }
      : { private: 50, group: 30, online: 40 };
  }, [instructorId]);
  const [pkg, setPkg] = useState<PackageType>("private");
  const [hours, setHours] = useState<number>(1);
  const estimate = useMemo(
    () => Math.max(1, hours) * pricing[pkg],
    [hours, pkg, pricing]
  );

  // Load persisted messages
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey]);

  // Track if user is near bottom to avoid forced scroll when reading history
  const handleScroll = () => {
    const el = chatListRef.current;
    if (!el) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
    setIsAtBottom(nearBottom);
  };

  // Auto-scroll only when user is at bottom or after the user sends a message
  useEffect(() => {
    const el = chatListRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    if (last && (isAtBottom || last.role === "user")) {
      el.scrollTop = el.scrollHeight; // instant scroll to avoid swipe animation
    }
  }, [messages, isAtBottom]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const msg: ChatMessage = {
      id: `${Date.now()}`,
      role: "user",
      text: content,
      ts: Date.now(),
    };
    setMessages((m) => [...m, msg]);
    setInput("");
    setComposerHint("");

    // Optional demo auto-reply from instructor
    setTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `${Date.now()}_r`,
        role: "instructor",
        text: "Thanks for reaching out! I'll get back with availability shortly.",
        ts: Date.now(),
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
      setLastSeen(Date.now());
    }, 900);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const timeSince = (ts: number) => {
    const sec = Math.floor((Date.now() - ts) / 1000);
    if (sec < 60) return `${sec}s`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    const day = Math.floor(hr / 24);
    return `${day}d`;
  };

  const setTemplate = (text: string, autoSend = false, hint?: string) => {
    if (autoSend) {
      send(text);
      return;
    }
    setInput(text);
    if (hint) setComposerHint(hint);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="mb-6">
          <Link
            href={`/instructors/${instructorId}`}
            className="inline-flex items-center gap-2 text-gray-700 hover:underline"
          >
            <ArrowLeft size={18} /> Back to profile
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left column: info & actions */}
          <div className="space-y-6">
            {/* Header & status */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Instructor #{instructorId}
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {online
                      ? "Available now"
                      : `Last seen ${timeSince(
                          lastSeen
                        )} ago · Typically replies in ~2 hours`}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 text-sm font-medium ${
                    online ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {online ? "Online" : "Offline"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="subtle"
                  size="sm"
                  className="border border-black text-white hover:bg-black/90"
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    setMessages([]);
                    setComposerHint("");
                    try {
                      localStorage.removeItem(storageKey);
                    } catch {}
                  }}
                >
                  Clear chat
                </Button>
              </div>
            </section>

            {/* Quick actions */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Quick actions
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTemplate(
                      "Hi! I'd like to schedule a driving lesson. What times are available?"
                    )
                  }
                >
                  Schedule Lesson
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTemplate("Do you teach with an automatic or manual car?")
                  }
                >
                  Ask About Car Type
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTemplate(
                      "Could you provide a quote for a 2-hour lesson?"
                    )
                  }
                >
                  Request Quote
                </Button>
              </div>
            </section>

            {/* Availability */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Availability
              </h2>
              <div className="flex flex-wrap gap-2">
                {availability.map((slot) => (
                  <button
                    key={slot}
                    onClick={() =>
                      setTemplate(
                        `I'd like to book a lesson on ${slot}. Is this available?`,
                        false,
                        "Press Send to request this time."
                      )
                    }
                    className="px-3 py-1.5 rounded-full text-sm border border-black bg-black text-white hover:bg-black/90"
                    title="Send booking request for this slot"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </section>

            {/* Lesson estimate */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Lesson estimate
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Package
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["private", "group", "online"] as PackageType[]).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setPkg(p)}
                          className={`px-3 py-1.5 rounded-full text-sm border ${
                            pkg === p
                              ? "border-[#F03D3D] bg-[#F03D3D]/10 text-[#F03D3D]"
                              : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                          }`}
                          type="button"
                        >
                          {p[0].toUpperCase() + p.slice(1)} (${pricing[p]}/hr)
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Hours
                  </label>
                  <div className="inline-flex items-stretch h-9 rounded-lg border border-gray-300 overflow-hidden bg-white">
                    <button
                      type="button"
                      className="w-9 grid place-items-center text-gray-700 hover:bg-gray-50 focus:outline-none select-none"
                      onClick={() => setHours((h) => Math.max(1, h - 1))}
                      aria-label="Decrease hours"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      step={1}
                      value={hours}
                      onChange={(e) =>
                        setHours(
                          Math.max(1, Math.min(8, Number(e.target.value) || 1))
                        )
                      }
                      className="w-12 text-center hours-input-hide-spinners appearance-none focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/30"
                    />
                    <button
                      type="button"
                      className="w-9 grid place-items-center text-gray-700 hover:bg-gray-50 focus:outline-none select-none"
                      onClick={() => setHours((h) => Math.min(8, h + 1))}
                      aria-label="Increase hours"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Estimated total:
                  <span className="font-semibold text-gray-900 ml-1">
                    ${estimate}
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    setTemplate(
                      `Estimate request: ${hours} hour(s) of ${pkg} lesson ≈ $${estimate}. Can we schedule?`,
                      false,
                      "Review and press Send to send your estimate request."
                    )
                  }
                >
                  Add to chat
                </Button>
              </div>
            </section>
          </div>

          {/* Right column: chat */}
          <section className="bg-white rounded-xl border border-gray-200 h-[70vh] flex flex-col">
            {/* Chat messages */}
            <div
              ref={chatListRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3"
            >
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm mt-10">
                  Start the conversation by saying hello.
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm border ${
                        m.role === "user"
                          ? "bg-[#F03D3D] text-white border-[#F03D3D]"
                          : "bg-gray-50 text-gray-900 border-gray-200"
                      }`}
                    >
                      <div>{m.text}</div>
                      <div
                        className={`mt-1 text-[10px] ${
                          m.role === "user" ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {formatTime(m.ts)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm border bg-gray-50 text-gray-900 border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex -space-x-1">
                        <span className="inline-block h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                        <span className="inline-block h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="inline-block h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      </span>
                      <span>Instructor is typing…</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
              {composerHint && (
                <div className="text-xs text-gray-500 mb-2">{composerHint}</div>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/30 focus:border-[#F03D3D]"
                  placeholder="Type your message..."
                />
                <Button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="rounded-full"
                >
                  Send
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
