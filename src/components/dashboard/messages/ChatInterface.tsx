"use client";

import React from "react";
import Image from "next/image";
import { Search, Send, Phone, Video, MoreVertical } from "lucide-react";

const contacts = [
  { id: 1, name: "Sarah Jenkins", msg: "See you tomorrow!", time: "10:30 AM", unread: 2, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
  { id: 2, name: "Michael Chen", msg: "Thanks for the lesson.", time: "Yesterday", unread: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
  { id: 3, name: "Emma Wilson", msg: "Can we reschedule?", time: "Yesterday", unread: 0, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" },
];

export const ChatInterface = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex h-[calc(100vh-12rem)]">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500/20 outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div key={contact.id} className={`p-4 flex gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${contact.id === 1 ? 'bg-red-50/50' : ''}`}>
              <div className="relative">
                <Image src={contact.avatar} alt={contact.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                {contact.unread > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F03D3D] rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{contact.name}</h4>
                  <span className="text-xs text-gray-400">{contact.time}</span>
                </div>
                <p className={`text-sm truncate ${contact.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {contact.msg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50/30">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={contacts[0].avatar} alt="Sarah" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-gray-900">Sarah Jenkins</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Phone className="w-5 h-5" /></button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Video className="w-5 h-5" /></button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex justify-center">
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today, 10:30 AM</span>
          </div>
          
          <div className="flex gap-3">
            <Image src={contacts[0].avatar} alt="Sarah" width={32} height={32} className="w-8 h-8 rounded-full object-cover mt-1" />
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-md">
              <p className="text-gray-800 text-sm">Hi! I was wondering if we could focus on parallel parking in our next lesson?</p>
            </div>
          </div>

          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-[#F03D3D] flex items-center justify-center text-white text-xs font-bold mt-1">I</div>
            <div className="bg-[#F03D3D] text-white p-3 rounded-2xl rounded-tr-none shadow-sm shadow-red-100 max-w-md">
              <p className="text-sm">Absolutely, Sarah! We can spend the first hour on parking maneuvers. See you tomorrow!</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Image src={contacts[0].avatar} alt="Sarah" width={32} height={32} className="w-8 h-8 rounded-full object-cover mt-1" />
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-md">
              <p className="text-gray-800 text-sm">Great, thank you! See you tomorrow!</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500/20 outline-none"
            />
            <button className="p-3 bg-[#F03D3D] text-white rounded-xl hover:bg-red-600 transition shadow-lg shadow-red-200">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
