import React from 'react';
import { ScanStats, WhatsAppCategory } from '../../@types/fs';
import { formatBytes } from '../../utils/formatter';
import { HardDrive, FileText, Image, Video, Music, Database, FolderArchive } from 'lucide-react';

interface StorageOverviewProps {
  stats: ScanStats;
  currentDirName: string;
  selectedCategory: WhatsAppCategory | 'All';
  onSelectCategory: (cat: WhatsAppCategory | 'All') => void;
}

const categoryIcons: Record<WhatsAppCategory, React.ReactNode> = {
  Images: <Image className="w-5 h-5 text-blue-400 shrink-0" />,
  Videos: <Video className="w-5 h-5 text-purple-400 shrink-0" />,
  Audio: <Music className="w-5 h-5 text-amber-400 shrink-0" />,
  Documents: <FileText className="w-5 h-5 text-emerald-400 shrink-0" />,
  VoiceNotes: <Music className="w-5 h-5 text-teal-400 shrink-0" />,
  Databases: <Database className="w-5 h-5 text-rose-400 shrink-0" />,
  Other: <FolderArchive className="w-5 h-5 text-gray-400 shrink-0" />,
};

export const StorageOverview: React.FC<StorageOverviewProps> = ({
  stats,
  currentDirName,
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = Object.keys(stats.categoryBreakdown) as WhatsAppCategory[];

  return (
    <div className="space-y-6">
      {/* Top Banner Info */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-wa-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-green/10 border border-wa-green/20 text-xs text-wa-green font-mono font-medium tracking-wide">
            <HardDrive className="w-3.5 h-3.5" /> 
            <span>Direktori Aktif: <strong className="text-white">{currentDirName}</strong></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ringkasan Penyimpanan WhatsApp
          </h2>
          <p className="text-sm text-gray-300 font-normal">
            Ditemukan <span className="font-semibold text-white">{stats.totalFiles}</span> file sampah & media dengan total ukuran <span className="font-semibold text-wa-green">{formatBytes(stats.totalSize)}</span>
          </p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* All Categories Card */}
        <div 
          onClick={() => onSelectCategory('All')}
          className={`glass-card p-5 rounded-2xl cursor-pointer group relative overflow-hidden ${
            selectedCategory === 'All' 
              ? 'border-wa-green bg-wa-green/10 shadow-lg shadow-wa-green/10 ring-1 ring-wa-green' 
              : 'hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">Semua Kategori</span>
            <div className="p-2 rounded-xl bg-wa-dark/60 border border-white/5">
              <HardDrive className="w-5 h-5 text-wa-green" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{formatBytes(stats.totalSize)}</div>
          <div className="text-xs font-medium text-gray-400 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-wa-green" />
            <span>{stats.totalFiles} file total</span>
          </div>
        </div>

        {/* Individual Category Cards */}
        {categories.map((cat) => {
          const data = stats.categoryBreakdown[cat];
          const isSelected = selectedCategory === cat;

          return (
            <div
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`glass-card p-5 rounded-2xl cursor-pointer group relative overflow-hidden ${
                isSelected 
                  ? 'border-wa-green bg-wa-green/10 shadow-lg shadow-wa-green/10 ring-1 ring-wa-green' 
                  : 'hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">{cat}</span>
                <div className="p-2 rounded-xl bg-wa-dark/60 border border-white/5">
                  {categoryIcons[cat]}
                </div>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">{formatBytes(data.size)}</div>
              <div className="text-xs font-medium text-gray-400 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-wa-green transition-colors" />
                <span>{data.count} file</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};