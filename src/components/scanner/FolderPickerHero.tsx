import React from 'react';
import { FolderOpen, ShieldAlert, Cpu } from 'lucide-react';

interface FolderPickerHeroProps {
  onSelectFolder: () => void;
  isLoading: boolean;
}

export const FolderPickerHero: React.FC<FolderPickerHeroProps> = ({ onSelectFolder, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      <div className="max-w-xl bg-wa-panel border border-wa-border p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-wa-green/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-16 h-16 bg-wa-green/10 border border-wa-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-wa-green">
          <FolderOpen className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Pilih Folder WhatsApp Lokal Anda</h2>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Pindai folder penyimpanan WhatsApp Desktop (misal folder <code className="bg-wa-dark px-1.5 py-0.5 rounded text-wa-green">Media</code> atau <code className="bg-wa-dark px-1.5 py-0.5 rounded text-wa-green">WhatsApp Documents</code>) untuk mulai membersihkan file sampah secara aman.
        </p>

        <button
          onClick={onSelectFolder}
          disabled={isLoading}
          className="w-full py-3.5 px-6 bg-wa-green hover:bg-[#008f72] active:scale-[0.99] transition text-wa-dark font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-wa-green/10 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Cpu className="w-5 h-5 animate-spin text-wa-dark" />
              <span>Memindai Direktori...</span>
            </>
          ) : (
            <>
              <FolderOpen className="w-5 h-5" />
              <span>Buka Folder Penyimpanan</span>
            </>
          )}
        </button>

        <div className="mt-6 pt-6 border-t border-wa-border flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldAlert className="w-4 h-4 text-yellow-500 shrink-0" />
          <span>File Anda diproses 100% di browser. Tidak ada data yang diunggah ke cloud.</span>
        </div>
      </div>
    </div>
  );
};