"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { MessageCircle, Send, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Button from "@/components/ui/Button";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: number;
}

export default function HelpChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Simple local storage persistence per user
  const storageKey = useMemo(
    () => (user ? `help-chat-${user.id}` : "help-chat-guest"),
    [user]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMessages(JSON.parse(raw));
      else
        setMessages([
          {
            id: "welcome",
            text: "Hi! You're connected to Support. Ask us anything about bookings, payments, or your account.",
            sender: "support",
            timestamp: Date.now(),
          },
        ]);
    } catch {
      // Ignore localStorage errors (e.g., private browsing)
    }
     
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      // Ignore localStorage errors (e.g., storage full, private browsing)
    }
  }, [messages, storageKey]);

  // Track whether user is at bottom to avoid jumping when reading history
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 40; // px tolerance
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    if (!last) return;
    // Auto-scroll only if the user sent the message OR the view is already at bottom
    if (last.sender === "user" || isAtBottom) {
      // Jump to bottom (no smooth to keep up with rapid updates)
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: `${Date.now()}`,
      text,
      sender: "user",
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, msg]);
    setInput("");

    // Simulate an automated support reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `${Date.now()}-r`,
        text: "Thanks for reaching out! A member of our team will follow up by email shortly. Meanwhile, check our Help categories.",
        sender: "support",
        timestamp: Date.now(),
      };
      setMessages((m) => [...m, reply]);
    }, 800);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex gap-8">
          <AccountSidebar activeItem="Help center" />
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <MessageCircle size={20} className="text-red-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Live Chat
                  </h1>
                  <p className="text-sm text-gray-500">
                    Support typically replies within a few minutes
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => router.push("/help")}>
                Back to help
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl h-[560px] flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  You're chatting with Support
                </div>
              </div>

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-3"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                        m.sender === "user"
                          ? "bg-red-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-900 rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="p-4 border-t border-gray-100 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Button onClick={sendMessage} disabled={!input.trim()}>
                  <div className="flex items-center gap-2">
                    <Send size={16} />
                    <span>Send</span>
                  </div>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
