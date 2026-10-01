import React, { useState, useMemo } from 'react';
import { useFileSystem } from './hooks/useFileSystem';
import { Header } from './components/layout/Header';
import { FolderPickerHero } from './components/scanner/FolderPickerHero';
import { StorageOverview } from './components/dashboard/StorageOverview';
import { ActionToolbar } from './components/explorer/ActionToolbar';
import { TriageTable } from './components/explorer/TriageTable';
import { exportScanReportToJSON } from './utils/backupExporter';
import { WhatsAppCategory } from './@types/fs';
import { FolderOpen, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col text-gray-100 relative">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00a884]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#25d366]/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        {files.length === 0 ? (
          <div className="animate-fadeIn py-12">
            <FolderPickerHero onSelectFolder={scanDirectory} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Navigation / Rescan Control */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                onClick={scanDirectory}
                disabled={isLoading}
                className="glass-button px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 text-[#00a884] group-hover:-translate-x-0.5 transition-transform" />
                <span>Pilih Folder Lain / Pindai Ulang</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs bg-[#00a884]/10 text-[#25d366] border border-[#00a884]/25 shadow-inner">
                  <FolderOpen className="w-4 h-4 text-[#00a884]" /> 
                  <span className="font-mono font-medium truncate max-w-[220px] sm:max-w-xs">{currentDirName}</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Ready to Clean</span>
                </div>
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
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span>Daftar File</span>
                    <span className="text-sm font-semibold bg-white/10 text-gray-200 px-2.5 py-0.5 rounded-full border border-white/10">
                      {filteredFiles.length} item
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Tinjau, pilih, dan bersihkan file sampah WhatsApp dengan aman.</p>
                </div>

                {selectedCategory !== 'All' && (
                  <div className="self-start sm:self-center flex items-center gap-2 text-xs font-medium text-[#25d366] bg-[#00a884]/15 px-3 py-1.5 rounded-xl border border-[#00a884]/30 shadow-sm">
                    <span>Filter Aktif:</span>
                    <span className="font-bold underline uppercase tracking-wider">{selectedCategory}</span>
                  </div>
                )}
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
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-inner bg-black/20">
                <TriageTable
                  files={filteredFiles}
                  selectedIds={selectedIds}
                  onToggleSelect={handleToggleSelect}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-white/10 bg-[#0b141a]/90 backdrop-blur-md py-6 text-center text-xs text-gray-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-white">WaClean</span>
            <span className="text-gray-500">&bull;</span>
            <span>Secure Local WhatsApp Storage Cleaner</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Client-Side Private &bull; Zero Server Uploads</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;