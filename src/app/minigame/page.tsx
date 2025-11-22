"use client";

import React from "react";
import { HighwayRacer } from "@/components/minigame/HighwayRacer";
import { Trophy, Gift, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MinigamePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 pb-20">
      {/* Header */}
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/main1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Trophy className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-white">DriveMaster <span className="text-indigo-400">Arcade</span></span>
          </div>

          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Weekly <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Challenge</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Test your reflexes on the highway. The top 3 drivers this week win a <span className="text-white font-bold">50% discount</span> on their next lesson package.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-indigo-400 text-sm font-medium">
            <Gift className="w-4 h-4" />
            Current Prize Pool: $500 in Credits
          </div>
        </div>

        <HighwayRacer />

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
            <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
              <strong className="block text-white mb-1">Steer</strong>
              Use Arrow Keys or Tap Left/Right to change lanes.
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
              <strong className="block text-white mb-1">Dodge</strong>
              Avoid hitting other vehicles. One crash and it's over.
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
              <strong className="block text-white mb-1">Win</strong>
              Score points for distance. Speed increases over time.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

