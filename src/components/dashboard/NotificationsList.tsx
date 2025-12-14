"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar,
  X as XIcon,
  MessageSquare,
  AlertCircle,
  CreditCard,
  Clock,
  Check,
  Trash2,
  Filter
} from "lucide-react";
import { Notification } from "@/hooks/useNotifications";
import Button from "@/components/ui/Button";

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onRemove: (id: string) => void;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "booking":
      return <Calendar className="w-5 h-5 text-blue-500" />;
    case "cancellation":
      return <XIcon className="w-5 h-5 text-red-500" />;
    case "reminder":
      return <Clock className="w-5 h-5 text-orange-500" />;
    case "message":
      return <MessageSquare className="w-5 h-5 text-green-500" />;
    case "payment":
      return <CreditCard className="w-5 h-5 text-purple-500" />;
    case "system":
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "booking": return "bg-blue-50 border-blue-100";
    case "cancellation": return "bg-red-50 border-red-100";
    case "reminder": return "bg-orange-50 border-orange-100";
    case "message": return "bg-green-50 border-green-100";
    case "payment": return "bg-purple-50 border-purple-100";
    default: return "bg-gray-50 border-gray-100";
  }
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
}) => {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              filter === "unread"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="bg-[#F03D3D] text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={onMarkAllAsRead}
              className="text-sm"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
            <p className="text-gray-500 mt-1">
              {filter === "unread" 
                ? "You're all caught up! No unread notifications." 
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                group relative flex gap-4 p-5 rounded-2xl border transition-all duration-200
                ${notification.isRead 
                  ? "bg-white border-gray-200 hover:border-gray-300" 
                  : "bg-blue-50/30 border-blue-100 hover:border-blue-200 shadow-sm"
                }
              `}
            >
              {/* Icon */}
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`text-base font-semibold ${notification.isRead ? "text-gray-900" : "text-gray-900"}`}>
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-gray-400 whitespace-nowrap shrink-0">
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="mt-3 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.isRead && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => onRemove(notification.id)}
                    className="text-xs font-medium text-gray-400 hover:text-red-600 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Unread Indicator */}
              {!notification.isRead && (
                <div className="absolute top-5 right-5 w-2 h-2 bg-[#F03D3D] rounded-full" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
