import { CENTRAL_PRACTICAL_MAPPING, CentralPracticalMapping } from './practicalMapping';

export interface MatrixData {
  caption: string;
  headers: string[];
  rows: { label: string; values: number[] }[];
}

export interface ProgramEntry {
  id: string;
  subTitle?: string;
  filename: string;
  code: string;
  inputType: 'predefined' | 'interactive';
  sampleInput: string;
  sampleOutput: string;
  mappingStatus: 'verified' | 'needs-verification';
  note?: string;
}

export interface PracticalItem {
  number: string;
  title: string;
  question: string;
  keywords: string[];
  matrix?: MatrixData;
  sudokuPuzzle?: number[][];
  isPlaceholder?: boolean;
  placeholderMessage?: string;
  mappingStatus: 'verified' | 'needs-verification';
  programs: ProgramEntry[];
}

function toPracticalItem(entry: CentralPracticalMapping): PracticalItem {
  return {
    number: entry.practicalNumber,
    title: entry.title,
    question: entry.officialQuestion,
    keywords: entry.keywords,
    matrix: entry.matrix,
    sudokuPuzzle: entry.sudokuPuzzle,
    isPlaceholder: entry.programs.length === 0,
    placeholderMessage: entry.statusNote,
    mappingStatus: entry.mappingStatus,
    programs: entry.programs.map((prog) => ({
      id: prog.id,
      subTitle: prog.subTitle,
      filename: prog.uploadedFilename,
      code: prog.code,
      inputType: prog.inputType,
      sampleInput: prog.sampleInput,
      sampleOutput: prog.sampleOutput,
      mappingStatus: prog.mappingStatus,
      note: prog.note,
    })),
  };
}

export const PART_ONE_PRACTICALS: PracticalItem[] = CENTRAL_PRACTICAL_MAPPING.filter(
  (item) => item.part === 'PART_01'
).map(toPracticalItem);

export const PART_TWO_QUESTIONS: PracticalItem[] = CENTRAL_PRACTICAL_MAPPING.filter(
  (item) => item.part === 'PART_02'
).map(toPracticalItem);
