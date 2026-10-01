import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 bg-wa-panel/80 border border-wa-border px-3 py-1.5 rounded-full text-xs text-wa-green font-medium shadow-sm">
      <ShieldCheck className="w-4 h-4 text-wa-green animate-pulse" />
      <span>100% Client-Side & Secure (Zero-Upload)</span>
    </div>
  );
};