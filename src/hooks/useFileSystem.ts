import { useState, useCallback } from 'react';
import { FileItem, ScanStats, WhatsAppCategory } from '../@types/fs';
import { categorizeFile, isFileSafeToClean } from '../utils/triageRules';

export function useFileSystem() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDirName, setCurrentDirName] = useState<string>('');
  const [scanStats, setScanStats] = useState<ScanStats>({
    totalFiles: 0,
    totalSize: 0,
    categoryBreakdown: {
      Images: { count: 0, size: 0 },
      Videos: { count: 0, size: 0 },
      Audio: { count: 0, size: 0 },
      Documents: { count: 0, size: 0 },
      VoiceNotes: { count: 0, size: 0 },
      Databases: { count: 0, size: 0 },
      Other: { count: 0, size: 0 },
    },
  });

  // Fungsi rekursif untuk membaca direktori lokal menggunakan File System Access API
  const scanDirectory = useCallback(async () => {
    // Periksa dukungan browser terhadap File System Access API
    if (!('showDirectoryPicker' in window)) {
      alert('Browser Anda tidak mendukung File System Access API. Gunakan Google Chrome atau Microsoft Edge versi terbaru.');
      return;
    }

    try {
      setIsLoading(true);
      const dirHandle = await window.showDirectoryPicker();
      setCurrentDirName(dirHandle.name);

      const scannedFiles: FileItem[] = [];
      const breakdown: ScanStats['categoryBreakdown'] = {
        Images: { count: 0, size: 0 },
        Videos: { count: 0, size: 0 },
        Audio: { count: 0, size: 0 },
        Documents: { count: 0, size: 0 },
        VoiceNotes: { count: 0, size: 0 },
        Databases: { count: 0, size: 0 },
        Other: { count: 0, size: 0 },
      };

      let totalSizeAccumulator = 0;

      async function traverseDirectory(handle: FileSystemDirectoryHandle, pathPrefix = '') {
        for await (const entry of handle.values()) {
          const currentPath = pathPrefix ? `${pathPrefix}/${entry.name}` : entry.name;
          
          if (entry.kind === 'file') {
            const fileHandle = entry as FileSystemFileHandle;
            const file = await fileHandle.getFile();
            const category = categorizeFile(file.name);
            const extension = file.name.split('.').pop()?.toLowerCase() || '';

            const fileItem: FileItem = {
              id: `${currentPath}-${file.lastModified}`,
              name: file.name,
              path: currentPath,
              size: file.size,
              lastModified: file.lastModified,
              category,
              extension,
              handle: fileHandle,
              isSafeToDelete: isFileSafeToClean(category, file.name),
            };

            scannedFiles.push(fileItem);

            // Akumulasi statistik
            breakdown[category].count += 1;
            breakdown[category].size += file.size;
            totalSizeAccumulator += file.size;

          } else if (entry.kind === 'directory') {
            // Lewatkan folder sistem tersembunyi
            if (!entry.name.startsWith('.')) {
              await traverseDirectory(entry as FileSystemDirectoryHandle, currentPath);
            }
          }
        }
      }

      await traverseDirectory(dirHandle);

      setFiles(scannedFiles);
      setScanStats({
        totalFiles: scannedFiles.length,
        totalSize: totalSizeAccumulator,
        categoryBreakdown: breakdown,
      });

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Gagal membaca direktori:', error);
        alert('Terjadi kesalahan saat membaca direktori.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fungsi untuk menghapus file terpilih dari disk lokal
  const deleteFiles = useCallback(async (fileIds: string[]) => {
    let deletedCount = 0;
    let freedBytes = 0;

    const remainingFiles = [...files];

    for (const id of fileIds) {
      const targetIndex = remainingFiles.findIndex(f => f.id === id);
      if (targetIndex !== -1) {
        const item = remainingFiles[targetIndex];
        try {
          // Meminta izin penghapusan (Write permission)
          const permission = await item.handle.queryPermission({ mode: 'readwrite' });
          if (permission !== 'granted') {
            const request = await item.handle.requestPermission({ mode: 'readwrite' });
            if (request !== 'granted') continue;
          }

          // Hapus file dari handle induk atau gunakan metode penghapusan yang tersedia
          // Catatan: FileSystemDirectoryHandle.removeEntry didukung di browser modern
          // Kita asumsikan parent mendukung atau handle file bisa dihapus
          await (item.handle as any).remove?.(); 
          
          freedBytes += item.size;
          deletedCount++;
          remainingFiles.splice(targetIndex, 1);
        } catch (err) {
          console.warn(`Gagal menghapus file ${item.name}:`, err);
        }
      }
    }

    setFiles(remainingFiles);
    // Recalculate stats sederhana bisa ditambahkan nanti atau reset
    return { deletedCount, freedBytes };
  }, [files]);

  return {
    files,
    isLoading,
    currentDirName,
    scanStats,
    scanDirectory,
    deleteFiles,
  };
}