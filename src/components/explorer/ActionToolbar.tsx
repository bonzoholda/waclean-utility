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
    <div className="bg-wa-panel border border-wa-border p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onSelectAll}
          className="flex items-center gap-2 px-3 py-2 bg-wa-dark hover:bg-wa-hover border border-wa-border rounded-lg text-xs font-medium text-gray-300 transition"
        >
          {isAllSelected ? <CheckSquare className="w-4 h-4 text-wa-green" /> : <Square className="w-4 h-4" />}
          <span>{isAllSelected ? 'Batalkan Semua' : 'Pilih Semua'}</span>
        </button>
        <span className="text-xs text-gray-400">
          Dipilih: <strong className="text-white">{selectedCount}</strong> dari {totalCount} file
        </span>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={onExportReport}
          className="flex items-center gap-2 px-4 py-2 bg-wa-dark hover:bg-wa-hover border border-wa-border rounded-lg text-xs font-medium text-gray-300 transition"
        >
          <Download className="w-4 h-4 text-blue-400" />
          <span>Ekspor Laporan JSON</span>
        </button>

        <button
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Hapus Terpilih ({selectedCount})</span>
        </button>
      </div>
    </div>
  );
};