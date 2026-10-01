import { WhatsAppCategory } from '../@types/fs';

export function categorizeFile(fileName: string): WhatsAppCategory {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic'];
  const videoExts = ['mp4', 'mkv', 'mov', '3gp', 'avi'];
  const audioExts = ['mp3', 'm4a', 'aac', 'wav', 'ogg'];
  const docExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'];
  const voiceExts = ['opus', 'oga', 'ogg']; // WhatsApp voice notes usually .opus
  const dbExts = ['db', 'crypt12', 'crypt14', 'crypt15', 'sqlite'];

  if (imageExts.includes(ext)) return 'Images';
  if (videoExts.includes(ext)) return 'Videos';
  if (voiceExts.includes(ext)) return 'VoiceNotes';
  if (audioExts.includes(ext)) return 'Audio';
  if (docExts.includes(ext)) return 'Documents';
  if (dbExts.includes(ext)) return 'Databases';

  return 'Other';
}

export function isFileSafeToClean(category: WhatsAppCategory, fileName: string): boolean {
  // Jangan pernah rekomendasikan hapus database utama WhatsApp secara otomatis
  if (category === 'Databases') return false;
  
  // File .opus (Voice Notes) dan video/gambar biasanya target utama pembersihan
  return ['Images', 'Videos', 'VoiceNotes', 'Audio', 'Documents', 'Other'].includes(category);
}