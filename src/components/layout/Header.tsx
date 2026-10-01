import React from 'react';
import { HardDrive, ShieldCheck } from 'lucide-react';
import { PrivacyBadge } from './PrivacyBadge';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-white/10 bg-wa-dark/80 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-wa-green/20 to-wa-lightGreen/10 p-2.5 rounded-2xl border border-wa-green/30 shadow-inner">
          <HardDrive className="w-5 h-5 sm:w-6 sm:h-6 text-wa-green" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
            WaClean 
            <span className="text-[10px] sm:text-xs uppercase bg-wa-green/20 text-wa-lightGreen px-2 py-0.5 rounded-md border border-wa-green/30 font-mono font-semibold">
              Utility
            </span>
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-400 hidden xs:block">Local WhatsApp Storage Triage & Cleaner</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <PrivacyBadge />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 font-medium shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">100% Private & Secure</span>
          <span className="sm:hidden">Secure</span>
        </div>
      </div>
    </header>
  );
};