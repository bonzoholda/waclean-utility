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
      <div className="bg-wa-panel border border-wa-border rounded-xl p-12 text-center text-gray-400">
        <p className="text-sm">Tidak ada file dalam kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-wa-panel border border-wa-border rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-wa-border bg-wa-dark/50 text-xs font-mono text-gray-400 uppercase tracking-wider">
              <th className="p-4 w-12 text-center">Pilih</th>
              <th className="p-4">Nama File & Path</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Ukuran</th>
              <th className="p-4">Terakhir Diubah</th>
              <th className="p-4 text-center">Status Keamanan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wa-border text-sm">
            {files.map((file) => {
              const isSelected = selectedIds.includes(file.id);

              return (
                <tr 
                  key={file.id} 
                  onClick={() => onToggleSelect(file.id)}
                  className={`hover:bg-wa-hover/40 transition cursor-pointer ${isSelected ? 'bg-wa-green/5' : ''}`}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onToggleSelect(file.id)} className="text-gray-400 hover:text-white">
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-wa-green" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white truncate max-w-xs md:max-w-md" title={file.name}>
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate max-w-xs md:max-w-md" title={file.path}>
                      {file.path}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-wa-dark border border-wa-border text-gray-300">
                      {file.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-300">
                    {formatBytes(file.size)}
                  </td>
                  <td className="p-4 text-xs text-gray-400">
                    {formatDate(file.lastModified)}
                  </td>
                  <td className="p-4 text-center">
                    {file.isSafeToDelete ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-wa-green/10 text-wa-green border border-wa-green/20" title="Aman dibersihkan">
                        <ShieldCheck className="w-3.5 h-3.5" /> Aman
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20" title="Database/Sistem - Jangan dihapus sembarangan">
                        <ShieldAlert className="w-3.5 h-3.5" /> Penting
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