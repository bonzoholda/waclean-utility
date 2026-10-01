// File System Access API Type Definitions

export type WhatsAppCategory = 'Images' | 'Videos' | 'Audio' | 'Documents' | 'VoiceNotes' | 'Databases' | 'Other';

export interface FileItem {
  id: string;
  name: string;
  path: string;
  size: number; // in bytes
  lastModified: number;
  category: WhatsAppCategory;
  extension: string;
  handle: FileSystemFileHandle;
  isSafeToDelete: boolean;
  isFavorite?: boolean;
}

export type TriageAction = 'delete' | 'archive' | 'keep';

export interface ScanStats {
  totalFiles: number;
  totalSize: number;
  categoryBreakdown: Record<WhatsAppCategory, { count: number; size: number }>;
}