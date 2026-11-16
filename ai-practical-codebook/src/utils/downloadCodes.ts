import JSZip from 'jszip';
import { PART_ONE_PRACTICALS, PART_TWO_QUESTIONS, PracticalItem } from '../data/practicalsData';

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadSinglePythonFile(filename: string, code: string): void {
  if (!code || !code.trim()) {
    throw new Error(`No source code available for ${filename}`);
  }
  const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
  triggerBlobDownload(blob, filename);
}

function addItemsToFolder(folder: JSZip, items: PracticalItem[]): {
  addedCount: number;
  skippedCount: number;
} {
  let addedCount = 0;
  let skippedCount = 0;
  const seen = new Set<string>();

  for (const item of items) {
    if (item.isPlaceholder || item.programs.length === 0) {
      skippedCount += 1;
      continue;
    }

    for (const prog of item.programs) {
      if (!prog.code || !prog.code.trim()) {
        skippedCount += 1;
        continue;
      }
      if (seen.has(prog.filename)) {
        throw new Error(`Duplicate filename detected in ZIP folder: ${prog.filename}`);
      }
      seen.add(prog.filename);
      folder.file(prog.filename, prog.code);
      addedCount += 1;
    }
  }

  return { addedCount, skippedCount };
}

export async function downloadPartOneZip(): Promise<{ addedCount: number; skippedCount: number }> {
  const zip = new JSZip();
  const stats = addItemsToFolder(zip, PART_ONE_PRACTICALS);
  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, 'AI_Laboratory_Practicals.zip');
  return stats;
}

export async function downloadPartTwoZip(): Promise<{ addedCount: number; skippedCount: number }> {
  const zip = new JSZip();
  const stats = addItemsToFolder(zip, PART_TWO_QUESTIONS);
  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, 'AI_Examination_Questions.zip');
  return stats;
}

export async function downloadAllCodesZip(): Promise<{
  part1Count: number;
  part2Count: number;
  skippedCount: number;
}> {
  const zip = new JSZip();
  const rootFolder = zip.folder('AI_Practical_Codebook_All_Codes');
  if (!rootFolder) {
    throw new Error('Could not create root ZIP folder.');
  }

  const part1Folder = rootFolder.folder('Part_01_Laboratory_Practicals');
  const part2Folder = rootFolder.folder('Part_02_Examination_Questions');
  if (!part1Folder || !part2Folder) {
    throw new Error('Could not create part folders in ZIP.');
  }

  const p1Stats = addItemsToFolder(part1Folder, PART_ONE_PRACTICALS);
  const p2Stats = addItemsToFolder(part2Folder, PART_TWO_QUESTIONS);

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, 'AI_Practical_Codebook_All_Codes.zip');

  return {
    part1Count: p1Stats.addedCount,
    part2Count: p2Stats.addedCount,
    skippedCount: p1Stats.skippedCount + p2Stats.skippedCount,
  };
}
