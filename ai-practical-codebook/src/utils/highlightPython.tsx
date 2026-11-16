import React from 'react';

const PYTHON_KEYWORDS = new Set([
  'False',
  'None',
  'True',
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'try',
  'while',
  'with',
  'yield',
]);

const PYTHON_BUILTINS = new Set([
  'abs',
  'all',
  'any',
  'bool',
  'dict',
  'divmod',
  'enumerate',
  'float',
  'input',
  'int',
  'len',
  'list',
  'map',
  'max',
  'min',
  'print',
  'range',
  'reversed',
  'set',
  'sorted',
  'str',
  'sum',
  'tuple',
  'zip',
]);

type TokenType = 'comment' | 'string' | 'number' | 'keyword' | 'builtin' | 'funcname' | 'plain';

interface Token {
  type: TokenType;
  value: string;
}

const TOKEN_CLASSES: Record<TokenType, string> = {
  comment: 'text-slate-400 italic',
  string: 'text-amber-300',
  number: 'text-violet-300',
  keyword: 'text-sky-300 font-medium',
  builtin: 'text-emerald-300',
  funcname: 'text-cyan-200 font-medium',
  plain: 'text-slate-100',
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let expectFuncName = false;

  while (i < line.length) {
    const ch = line[i];

    // Comment
    if (ch === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    // Strings ('...' or "...")
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === '\\' && j + 1 < line.length) {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j += 1;
          break;
        }
        j += 1;
      }
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      expectFuncName = false;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch) && (i === 0 || !/[A-Za-z0-9_]/.test(line[i - 1]))) {
      let j = i + 1;
      while (j < line.length && /[0-9.]/.test(line[j])) {
        j += 1;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      expectFuncName = false;
      continue;
    }

    // Identifiers / Keywords
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) {
        j += 1;
      }
      const word = line.slice(i, j);
      if (expectFuncName) {
        tokens.push({ type: 'funcname', value: word });
        expectFuncName = false;
      } else if (PYTHON_KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
        if (word === 'def' || word === 'class') {
          expectFuncName = true;
        }
      } else if (PYTHON_BUILTINS.has(word)) {
        tokens.push({ type: 'builtin', value: word });
      } else {
        tokens.push({ type: 'plain', value: word });
      }
      i = j;
      continue;
    }

    // Whitespace / Operators / Punctuation
    let j = i + 1;
    while (j < line.length && !/[#"'0-9A-Za-z_]/.test(line[j])) {
      j += 1;
    }
    const segment = line.slice(i, j);
    tokens.push({ type: 'plain', value: segment });
    if (segment.trim() !== '') {
      expectFuncName = false;
    }
    i = j;
  }

  return tokens;
}

export function highlightPythonLines(code: string): React.ReactNode[] {
  const lines = code.replace(/\r\n/g, '\n').split('\n');
  return lines.map((line, idx) => {
    const tokens = tokenizeLine(line);
    return (
      <div key={idx} className="table-row leading-relaxed hover:bg-white/[0.03]">
        <span
          aria-hidden="true"
          className="table-cell select-none pr-4 text-right text-xs text-slate-500 tabular-nums w-10"
        >
          {idx + 1}
        </span>
        <span className="table-cell whitespace-pre">
          {tokens.length === 0
            ? ' '
            : tokens.map((tok, tIdx) => (
                <span key={tIdx} className={TOKEN_CLASSES[tok.type]}>
                  {tok.value}
                </span>
              ))}
        </span>
      </div>
    );
  });
}
