import React from 'react';
import { Trash2, Download, CheckSquare, Square } from 'lucide-react';

interface ActionToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  onExportReport: () => void;
  isAllSelected: boolean;
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeleteSelected,
  onExportReport,
  isAllSelected,
}) => {
  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
        <button
          onClick={onSelectAll}
          className="glass-button flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-200"
        >
          {isAllSelected ? <CheckSquare className="w-4 h-4 text-wa-green" /> : <Square className="w-4 h-4 text-gray-400" />}
          <span>{isAllSelected ? 'Batalkan Semua' : 'Pilih Semua'}</span>
        </button>
        <div className="text-xs text-gray-400 font-medium">
          Dipilih: <strong className="text-white font-bold bg-wa-dark/80 px-2 py-1 rounded-md border border-white/5 ml-1">{selectedCount}</strong> dari {totalCount} file
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={onExportReport}
          className="glass-button flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-gray-200"
        >
          <Download className="w-4 h-4 text-blue-400" />
          <span>Ekspor Laporan</span>
        </button>

        <button
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer shadow-lg shadow-rose-500/10"
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Hapus ({selectedCount})</span>
        </button>
      </div>
    </div>
  );
};