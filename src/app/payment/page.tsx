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
  label: string;
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
    expMonth: "",
    expYear: "",
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
      isDefault: methods.length === 0,
    };
    setMethods((m) => [newMethod, ...m]);
    setAdding(false);
    setForm({ type: "card", name: "", number: "", expMonth: "", expYear: "", cvc: "" });
  };

  const setDefault = (id: string) => {
    setMethods((m) => m.map((pm) => ({ ...pm, isDefault: pm.id === id })));
  };

  const removeMethod = (id: string) => {
    setMethods((m) => {
      const filtered = m.filter((pm) => pm.id !== id);
      if (!filtered.some((pm) => pm.isDefault) && filtered[0]) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex gap-8">
          <AccountSidebar activeItem="Payment details" />
          <main className="flex-1" aria-label="Payment methods page">
            {!adding ? (
              /* Payment Methods List */
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payment Methods</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {methods.map((pm) => (
                    <div
                      key={pm.id}
                      className="bg-white rounded-lg border border-gray-200 p-5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-12 bg-white border border-gray-200 rounded flex items-center justify-center">
                          <div className="flex">
                            <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
                            <div className="w-4 h-4 rounded-full bg-orange-400 opacity-80 -ml-2"></div>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 text-sm">
                          <button
                            onClick={() => {/* Edit functionality */}}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeMethod(pm.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          {pm.label}
                        </p>
                        <p className="text-sm text-gray-600">{form.name || "Jacob Hardman"}</p>
                        
                        {pm.isDefault && (
                          <div className="pt-3">
                            <span className="text-sm text-gray-700">Default Payment Method</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Payment Method Button */}
                <button
                  onClick={() => setAdding(true)}
                  className="mt-6 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Add Payment Method
                </button>
              </div>
            ) : (
              /* Add Card Form */
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side - Card visual */}
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-md aspect-[315/184] rounded-[30px] p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E42C66 0%, #F55B46 100%)' }}>
                        {/* Background decorative ellipses */}
                        <div className="absolute rounded-full bg-black opacity-10" style={{ width: '321px', height: '226px', left: '-100px', top: '120px' }}></div>
                        <div className="absolute rounded-full bg-black opacity-[0.08]" style={{ width: '321px', height: '226px', right: '-100px', top: '-80px' }}></div>
                    
                    {/* Card content */}
                    <div className="relative h-full flex flex-col justify-between text-white">
                      {/* Top section */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm opacity-[0.54] font-medium mb-2">Name on card</p>
                          <p className="text-2xl font-medium">{form.name || 'Cardholder Name'}</p>
                        </div>
                             {/* Mastercard logo */}
                             <div className="w-[60px] h-[37px] relative">
                               {/* eslint-disable-next-line @next/next/no-img-element */}
                               <img 
                                 src="/images/mastercard-logo.svg" 
                                 alt="Mastercard" 
                                 className="w-full h-full"
                               />
                             </div>
                      </div>
                      
                      {/* Bottom section */}
                      <div className="flex justify-between items-end">
                        <p className="text-sm font-medium tracking-[0.035em] opacity-90">
                          {form.number ? form.number.replace(/(.{4})/g, '$1 ').trim() : '0000 0000 0000 0000'}
                        </p>
                        <p className="text-sm font-medium tracking-[0.035em]">
                          {form.expMonth && form.expYear ? `${form.expMonth}/${form.expYear}` : '09/25'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Right side - Form */}
                  <div className="space-y-6">
                    {/* Name on card */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on card <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Sienna Hewitt"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                          {/* Card number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              {form.number && (
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                  {getCardBrandLogo(form.number)}
                                </div>
                              )}
                              <input
                                type="text"
                                inputMode="numeric"
                                value={form.number}
                                onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
                                placeholder="0000 0000 0000 0000"
                                className={`w-full pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                  form.number ? 'pl-16' : 'pl-4'
                                }`}
                              />
                            </div>
                          </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={form.expMonth}
                            onChange={(e) => setForm((f) => ({ ...f, expMonth: e.target.value }))}
                            className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900"
                            style={{ width: '80px' }}
                          >
                            <option value="" disabled>MM</option>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = String(i + 1).padStart(2, '0');
                              return <option key={month} value={month}>{month}</option>;
                            })}
                          </select>
                          <select
                            value={form.expYear}
                            onChange={(e) => setForm((f) => ({ ...f, expYear: e.target.value }))}
                            className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900"
                            style={{ width: '80px' }}
                          >
                            <option value="" disabled>YY</option>
                            {Array.from({ length: 15 }, (_, i) => {
                              const year = new Date().getFullYear() + i;
                              const shortYear = String(year).slice(-2);
                              return <option key={year} value={shortYear}>{shortYear}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={form.cvc}
                          onChange={(e) => setForm((f) => ({ ...f, cvc: e.target.value }))}
                          placeholder="•••"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          maxLength={4}
                          style={{ width: '100px' }}
                        />
                      </div>
                    </div>

                    {/* Billing contact */}
                    <div className="pt-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Billing contact
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Add a second billing contact email.
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="accounts@untitledui.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10 13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10 7H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setAdding(false)}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          addMethod(e as any);
                        }}
                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function inferBrand(num: string) {
  const n = num.replace(/\s+/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^6(?:011|5)/.test(n)) return "Discover";
  return "Card";
}

function getCardBrandLogo(num: string) {
  const brand = inferBrand(num);
  
  if (brand === "Visa") {
    return (
      <div className="text-sm font-semibold text-gray-600">VISA</div>
    );
  }
  
  if (brand === "Mastercard") {
    return (
      <div className="flex">
        <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
        <div className="w-4 h-4 rounded-full bg-orange-400 opacity-80 -ml-2"></div>
      </div>
    );
  }
  
  return null;
}