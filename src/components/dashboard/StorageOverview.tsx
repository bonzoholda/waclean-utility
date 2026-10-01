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
  Images: <Image className="w-5 h-5 text-blue-400" />,
  Videos: <Video className="w-5 h-5 text-purple-400" />,
  Audio: <Music className="w-5 h-5 text-yellow-400" />,
  Documents: <FileText className="w-5 h-5 text-green-400" />,
  VoiceNotes: <Music className="w-5 h-5 text-teal-400" />,
  Databases: <Database className="w-5 h-5 text-red-400" />,
  Other: <FolderArchive className="w-5 h-5 text-gray-400" />,
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
      <div className="bg-wa-panel border border-wa-border p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-wa-green font-mono uppercase tracking-wider mb-1">
            <HardDrive className="w-4 h-4" /> Direktori Terpilih: {currentDirName}
          </div>
          <h2 className="text-2xl font-bold text-white">Ringkasan Penyimpanan WhatsApp</h2>
          <p className="text-sm text-gray-400">Total ditemukan {stats.totalFiles} file ({formatBytes(stats.totalSize)})</p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onSelectCategory('All')}
          className={`bg-wa-panel border p-5 rounded-xl cursor-pointer transition ${
            selectedCategory === 'All' ? 'border-wa-green bg-wa-hover/50' : 'border-wa-border hover:border-gray-500'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">Semua Kategori</span>
            <HardDrive className="w-5 h-5 text-wa-green" />
          </div>
          <div className="text-xl font-bold text-white">{formatBytes(stats.totalSize)}</div>
          <div className="text-xs text-gray-400 mt-1">{stats.totalFiles} file total</div>
        </div>

        {categories.map((cat) => {
          const data = stats.categoryBreakdown[cat];
          const isSelected = selectedCategory === cat;

          return (
            <div
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`bg-wa-panel border p-5 rounded-xl cursor-pointer transition ${
                isSelected ? 'border-wa-green bg-wa-hover/50' : 'border-wa-border hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-300">{cat}</span>
                {categoryIcons[cat]}
              </div>
              <div className="text-xl font-bold text-white">{formatBytes(data.size)}</div>
              <div className="text-xs text-gray-400 mt-1">{data.count} file</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};