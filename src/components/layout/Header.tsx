import React from 'react';
import { HardDrive, Github } from 'lucide-react';
import { PrivacyBadge } from './PrivacyBadge';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-wa-border bg-wa-dark/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-wa-green/10 p-2.5 rounded-xl border border-wa-green/20">
          <HardDrive className="w-6 h-6 text-wa-green" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            WaClean <span className="text-xs uppercase bg-wa-green text-wa-dark px-1.5 py-0.5 rounded font-mono">Utility</span>
          </h1>
          <p className="text-xs text-gray-400">Local WhatsApp Storage Triage & Cleaner</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <PrivacyBadge />
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-wa-panel hover:bg-wa-hover border border-wa-border text-gray-300 hover:text-white transition"
          title="View Source on GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};