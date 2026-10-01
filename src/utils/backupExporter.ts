import { FileItem } from '../@types/fs';

export function exportScanReportToJSON(files: FileItem[], folderName: string) {
  const report = {
    folderName,
    scanDate: new Date().toISOString(),
    totalFiles: files.length,
    totalSize: files.reduce((acc, f) => acc + f.size, 0),
    files: files.map(f => ({
      name: f.name,
      path: f.path,
      size: f.size,
      category: f.category,
      lastModified: new Date(f.lastModified).toISOString()
    }))
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `waclean-report-${folderName}-${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}