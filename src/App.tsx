import React, { useState, useMemo } from 'react';
import { useFileSystem } from './hooks/useFileSystem';
import { Header } from './components/layout/Header';
import { FolderPickerHero } from './components/scanner/FolderPickerHero';
import { StorageOverview } from './components/dashboard/StorageOverview';
import { ActionToolbar } from './components/explorer/ActionToolbar';
import { TriageTable } from './components/explorer/TriageTable';
import { exportScanReportToJSON } from './utils/backupExporter';
import { WhatsAppCategory } from './@types/fs';
import { FolderOpen, ArrowLeft, Trash2 } from 'lucide-react';

export function App() {
  const {
    files,
    isLoading,
    currentDirName,
    scanStats,
    scanDirectory,
    deleteFiles,
  } = useFileSystem();

  const [selectedCategory, setSelectedCategory] = useState<WhatsAppCategory | 'All'>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter file berdasarkan kategori yang dipilih di Dashboard
  const filteredFiles = useMemo(() => {
    if (selectedCategory === 'All') return files;
    return files.filter((f) => f.category === selectedCategory);
  }, [files, selectedCategory]);

  // Handler pilih/batalkan semua file pada view aktif
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredFiles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredFiles.map((f) => f.id));
    }
  };

  // Handler pilih/batalkan per item
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Eksekusi penghapusan file terpilih
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    const confirmMsg = `Apakah Anda yakin ingin menghapus ${selectedIds.length} file terpilih secara permanen dari komputer Anda?`;
    if (!window.confirm(confirmMsg)) return;

    const result = await deleteFiles(selectedIds);
    alert(`Berhasil menghapus ${result.deletedCount} file. Ruang penyimpanan yang dibebaskan: ${(result.freedBytes / (1024 * 1024)).toFixed(2)} MB`);
    setSelectedIds([]);
  };

  // Ekspor laporan pemindaian JSON
  const handleExportReport = () => {
    exportScanReportToJSON(files, currentDirName || 'whatsapp-storage');
  };

  const isAllSelected = filteredFiles.length > 0 && selectedIds.length === filteredFiles.length;

  return (
    <div className="min-h-screen bg-wa-dark text-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {files.length === 0 ? (
          <FolderPickerHero onSelectFolder={scanDirectory} isLoading={isLoading} />
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Navigation / Rescan Control */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                onClick={scanDirectory}
                disabled={isLoading}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-wa-panel border border-wa-border px-4 py-2 rounded-xl transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Pilih Folder Lain / Pindai Ulang</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-wa-green/10 text-wa-green border border-wa-green/20">
                  <FolderOpen className="w-3.5 h-3.5" /> Direktori Aktif: {currentDirName}
                </span>
              </div>
            </div>

            {/* Dashboard Overview Cards */}
            <StorageOverview
              stats={scanStats}
              currentDirName={currentDirName}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSelectedIds([]);
              }}
            />

            {/* File Explorer & Triage Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Daftar File ({filteredFiles.length})</span>
                  {selectedCategory !== 'All' && (
                    <span className="text-xs font-normal text-wa-green bg-wa-green/10 px-2 py-0.5 rounded border border-wa-green/20">
                      Filter: {selectedCategory}
                    </span>
                  )}
                </h3>
              </div>

              {/* Action Toolbar */}
              <ActionToolbar
                selectedCount={selectedIds.length}
                totalCount={filteredFiles.length}
                onSelectAll={handleToggleSelectAll}
                onDeleteSelected={handleDeleteSelected}
                onExportReport={handleExportReport}
                isAllSelected={isAllSelected}
              />

              {/* Data Table */}
              <TriageTable
                files={filteredFiles}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-wa-border py-6 text-center text-xs text-gray-500">
        <p>WaClean Utility &bull; Secure Local WhatsApp Storage Cleaner. Zero Server Uploads.</p>
      </footer>
    </div>
  );
}

export default App;