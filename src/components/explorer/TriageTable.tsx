import React from 'react';
import { FileItem } from '../../@types/fs';
import { formatBytes, formatDate } from '../../utils/formatter';
import { ShieldCheck, ShieldAlert, CheckSquare, Square } from 'lucide-react';

interface TriageTableProps {
  files: FileItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export const TriageTable: React.FC<TriageTableProps> = ({
  files,
  selectedIds,
  onToggleSelect,
}) => {
  if (files.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center text-gray-400 flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-wa-dark border border-white/5 flex items-center justify-center text-gray-500">
          <Square className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-gray-300">Tidak ada file dalam kategori ini.</p>
        <p className="text-xs text-gray-500">Coba pilih kategori lain atau ubah direktori pemindaian.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-wa-dark/40 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wider">
              <th className="p-4 w-12 text-center">Pilih</th>
              <th className="p-4">Nama File & Path</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Ukuran</th>
              <th className="p-4">Terakhir Diubah</th>
              <th className="p-4 text-center">Status Keamanan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {files.map((file) => {
              const isSelected = selectedIds.includes(file.id);

              return (
                <tr 
                  key={file.id} 
                  onClick={() => onToggleSelect(file.id)}
                  className={`transition-colors cursor-pointer group ${
                    isSelected ? 'bg-wa-green/10 hover:bg-wa-green/15' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => onToggleSelect(file.id)} 
                      className="text-gray-400 hover:text-white transition-colors p-1"
                      aria-label="Select file"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-wa-green" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-500 group-hover:text-gray-300" />
                      )}
                    </button>
                  </td>
                  <td className="p-4 max-w-[240px] sm:max-w-md">
                    <div className="font-semibold text-white truncate text-xs sm:text-sm" title={file.name}>
                      {file.name}
                    </div>
                    <div className="text-[11px] text-gray-400 truncate font-mono mt-0.5" title={file.path}>
                      {file.path}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-wa-dark/80 border border-white/10 text-gray-300 shadow-sm">
                      {file.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs font-medium text-gray-200 whitespace-nowrap">
                    {formatBytes(file.size)}
                  </td>
                  <td className="p-4 text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(file.lastModified)}
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    {file.isSafeToDelete ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm" title="Aman dibersihkan">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Aman
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm" title="Database/Sistem - Jangan dihapus sembarangan">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Penting
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};