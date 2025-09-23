"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { CreditCard, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Button from "@/components/ui/Button";

export type PaymentMethod = {
  id: string;
  type: "card" | "paypal";
  label: string; // e.g., Visa •••• 4242
  last4?: string;
  brand?: string;
  isDefault?: boolean;
};

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const storageKey = useMemo(
    () => (user ? `payment-methods-${user.id}` : "payment-methods-guest"),
    [user]
  );
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    type: "card" as const,
    name: "",
    number: "",
    exp: "",
    cvc: "",
  });

  // Auth guard
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Load methods
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMethods(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(methods));
    } catch {}
  }, [methods, storageKey]);

  const addMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.number || form.number.length < 4) return;
    const last4 = form.number.replace(/\s+/g, "").slice(-4);
    const brand = inferBrand(form.number);
    const label = `${brand} •••• ${last4}`;
    const newMethod: PaymentMethod = {
      id: `${Date.now()}`,
      type: "card",
      label,
      last4,
      brand,
      isDefault: methods.length === 0, // first becomes default
    };
    setMethods((m) => [newMethod, ...m]);
    setAdding(false);
    setForm({ type: "card", name: "", number: "", exp: "", cvc: "" });
  };

  const setDefault = (id: string) => {
    setMethods((m) => m.map((pm) => ({ ...pm, isDefault: pm.id === id })));
  };

  const removeMethod = (id: string) => {
    setMethods((m) => {
      const filtered = m.filter((pm) => pm.id !== id);
      if (!filtered.some((pm) => pm.isDefault) && filtered[0]) {
        filtered[0].isDefault = true; // ensure someone is default if any left
      }
      return filtered;
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-7xl 2xl:max-w-none">
        <div className="flex gap-8">
          <AccountSidebar activeItem="Payment details" />
          <main className="flex-1" aria-label="Payment methods page">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <CreditCard size={20} className="text-red-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Payment methods
                  </h1>
                  <p className="text-sm text-gray-500">
                    Add and manage your payment options
                  </p>
                </div>
              </div>
            </div>

            {/* Methods list */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              {methods.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={20} className="text-red-600" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    No payment methods yet. Add one to book lessons instantly.
                  </p>
                  {!adding && (
                    <Button
                      onClick={() => setAdding(true)}
                      aria-label="Add your first payment method"
                    >
                      <div className="flex items-center gap-2">
                        <Plus size={16} />
                        <span>Add payment method</span>
                      </div>
                    </Button>
                  )}
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {methods.map((pm) => (
                    <li
                      key={pm.id}
                      className="py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                          <CreditCard size={16} className="text-gray-500" />
                        </div>
                        <div>
                          <div className="text-gray-900 font-medium">
                            {pm.label}
                          </div>
                          {pm.isDefault ? (
                            <div className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle2 size={12} /> Default
                            </div>
                          ) : (
                            <button
                              onClick={() => setDefault(pm.id)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Make default
                            </button>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeMethod(pm.id)}
                        className="text-gray-500 hover:text-red-600"
                        aria-label={`Remove ${pm.label}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add form */}
            {adding && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Add a new card
                </h2>
                <form
                  className="space-y-3"
                  onSubmit={addMethod}
                  aria-label="Add payment method form"
                >
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Name on card
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="John Student"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Card number
                    </label>
                    <input
                      inputMode="numeric"
                      value={form.number}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, number: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="4242 4242 4242 4242"
                      minLength={12}
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-700 mb-1">
                        Exp
                      </label>
                      <input
                        value={form.exp}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, exp: e.target.value }))
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="w-28">
                      <label className="block text-sm text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        inputMode="numeric"
                        value={form.cvc}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, cvc: e.target.value }))
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="123"
                        minLength={3}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Save method</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAdding(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {!adding && (
              <Button
                onClick={() => setAdding(true)}
                className="md:hidden fixed bottom-6 right-6 shadow-lg"
                aria-label="Add payment method (mobile)"
              >
                <div className="flex items-center gap-2">
                  <Plus size={16} />
                  <span>Add method</span>
                </div>
              </Button>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function inferBrand(num: string) {
  const n = num.replace(/\s+/g, "");
  if (/^4[0-9]{6,}$/.test(n)) return "Visa";
  if (/^5[1-5][0-9]{5,}$/.test(n)) return "Mastercard";
  if (/^3[47][0-9]{5,}$/.test(n)) return "Amex";
  if (/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(n)) return "Discover";
  return "Card";
}
