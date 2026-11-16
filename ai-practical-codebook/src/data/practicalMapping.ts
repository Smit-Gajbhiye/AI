import { PYTHON_SOURCES } from './pythonSources';

export interface MatrixSpec {
  caption: string;
  headers: string[];
  rows: { label: string; values: number[] }[];
}

export interface CentralProgramMapping {
  id: string;
  subTitle?: string;
  uploadedFilename: string;
  actualDiskAsset: string;
  code: string;
  inputType: 'predefined' | 'interactive';
  sampleInput: string;
  sampleOutput: string;
  mappingStatus: 'verified' | 'needs-verification';
  note?: string;
}

export interface CentralPracticalMapping {
  part: 'PART_01' | 'PART_02';
  practicalNumber: string;
  title: string;
  officialQuestion: string;
  keywords: string[];
  matrix?: MatrixSpec;
  sudokuPuzzle?: number[][];
  mappingStatus: 'verified' | 'needs-verification';
  statusNote?: string;
  programs: CentralProgramMapping[];
}

const PREDEFINED_INPUT = 'Input: Predefined in the program — no user input required.';

const SUDOKU_PUZZLE_GRID: number[][] = [
  [0, 0, 0, 0, 0, 3, 8, 0, 7],
  [0, 4, 0, 8, 0, 9, 3, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 6, 0, 5],
  [3, 0, 0, 0, 9, 0, 4, 0, 2],
  [6, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 6, 9, 1, 3, 5, 2, 7, 0],
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 5, 0, 6, 8, 0, 0, 0],
];

const SUDOKU_INPUT = `0 0 0 0 0 3 8 0 7
0 4 0 8 0 9 3 0 0
0 0 0 4 0 0 0 0 0
0 0 0 0 4 0 6 0 5
3 0 0 0 9 0 4 0 2
6 0 0 0 0 0 0 0 1
0 6 9 1 3 5 2 7 0
8 0 0 0 0 0 0 0 0
0 0 5 0 6 8 0 0 0`;

const SUDOKU_OUTPUT = `9 1 6 2 5 3 8 4 7
7 4 2 8 1 9 3 5 6
5 8 3 4 7 6 1 2 9
1 2 8 3 4 7 6 9 5
3 5 7 6 9 1 4 8 2
6 9 4 5 8 2 7 3 1
4 6 9 1 3 5 2 7 8
8 7 1 9 2 4 5 6 3
2 3 5 7 6 8 9 1 4`;

/**
 * Central source-of-truth mapping between:
 * practical number <-> official question <-> uploaded filename <-> Python code <-> sample input <-> sample output
 */
export const CENTRAL_PRACTICAL_MAPPING: CentralPracticalMapping[] = [
  // =========================================================================
  // PART 01 — AI LABORATORY PRACTICALS (10 QUESTIONS)
  // =========================================================================
  {
    part: 'PART_01',
    practicalNumber: '01',
    title: 'A* Search for 8 Puzzle',
    officialQuestion: 'Implement A* Search for 8 puzzle problem',
    keywords: ['astar', 'a*', '8 puzzle', 'heuristic', 'manhattan', 'heapq', 'search'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-01',
        uploadedFilename: 'a_star_8_puzzle.py',
        actualDiskAsset: 'a_star_8_puzzle_08c08de6.py',
        code: PYTHON_SOURCES['a_star_8_puzzle.py'],
        inputType: 'interactive',
        sampleInput: '1 2 3\n4 - 5\n7 8 6',
        sampleOutput: `A* SEARCH - 8 PUZZLE

Enter Initial State :
1 2 3
4 - 5
7 8 6

Initial State:
1 2 3
4 - 5
7 8 6

Goal State:
1 2 3
4 5 6
7 8 -

Solution:

Step 0    Step 1    Step 2    
1 2 3        1 2 3        1 2 3        
4 - 5        4 5 -        4 5 6        
7 8 6        7 8 6        7 8 -        `,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '02',
    title: 'Alpha-Beta Pruning',
    officialQuestion: 'Implement Adversarial Search with Alpha-Beta pruning',
    keywords: ['alpha-beta', 'pruning', 'adversarial search', 'minimax', 'game tree'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-02',
        uploadedFilename: 'alpha_beta_pruning.py',
        actualDiskAsset: 'alpha_beta_pruning_e4f3dbbd.py',
        code: PYTHON_SOURCES['alpha_beta_pruning.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Pruned!
Optimal value: 3`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '03',
    title: 'Tower of Hanoi using State Space Search',
    officialQuestion: 'Implement Tower of Hanoi by State Space Search',
    keywords: ['tower of hanoi', 'state space', 'bfs', 'deque', 'disks', 'rods'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-03',
        uploadedFilename: '03_tower_of_hanoi.py',
        actualDiskAsset: '03_tower_of_hanoi_031fcd37.py',
        code: PYTHON_SOURCES['03_tower_of_hanoi.py'],
        inputType: 'interactive',
        sampleInput: '3',
        sampleOutput: `Enter number of disks: 3

Tower of Hanoi Solution:
Step 1 : Move disk 1 from A to C
Step 2 : Move disk 2 from A to B
Step 3 : Move disk 1 from C to B
Step 4 : Move disk 3 from A to C
Step 5 : Move disk 1 from B to A
Step 6 : Move disk 2 from B to C
Step 7 : Move disk 1 from A to C

Total Moves: 7`,
        mappingStatus: 'verified',
        note: 'Uses the BFS state-space search implementation (03_tower_of_hanoi.py) representing rod configurations as states and exploring legal disk transitions.',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '04',
    title: 'Sudoku using Backtracking and Constraint Propagation',
    officialQuestion:
      'Implement a Sudoku solver using backtracking and constraint propagation techniques.',
    keywords: ['sudoku', 'backtracking', 'constraint propagation', 'csp', 'mrv'],
    sudokuPuzzle: SUDOKU_PUZZLE_GRID,
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-04',
        uploadedFilename: 'sudoku_solver.py',
        actualDiskAsset: 'sudoku_solver_8930e565.py',
        code: PYTHON_SOURCES['sudoku_solver.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Solved Sudoku:
${SUDOKU_OUTPUT}`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '05',
    title: 'Local Beam Search for TSP',
    officialQuestion: 'Implement Local Beam Search for The Traveling Salesman Problem (TSP).',
    keywords: ['local beam search', 'tsp', 'travelling salesman', 'optimization', 'beam'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-05',
        uploadedFilename: 'local_beam_search_tsp.py',
        actualDiskAsset: 'local_beam_search_tsp_a5172bef.py',
        code: PYTHON_SOURCES['local_beam_search_tsp.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Best Route:
A -> B -> C -> D -> E -> A
Minimum Distance: 24`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '06',
    title: 'BFS-Based Planning',
    officialQuestion:
      'Use BFS to solve a planning problem. Examples can be 8 puzzle problem, Robot path planning, Blocks world etc.',
    keywords: ['bfs', 'breadth first search', 'planning', '8 puzzle', 'robot path', 'blocks world'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-06-a',
        subTitle: 'Program 6A — BFS for 8-Puzzle Problem',
        uploadedFilename: 'Practical_1_BFS_8_Puzzle.py',
        actualDiskAsset: 'Practical_1_BFS_8_Puzzle_3120222b.py',
        code: PYTHON_SOURCES['Practical_1_BFS_8_Puzzle.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `================================
       BFS - 8 PUZZLE
================================

Initial State:
1 2 3
5 - 6
4 7 8

Goal State:
1 2 3
4 5 6
7 8 -

Solution:

Step 0:
1 2 3
5 - 6
4 7 8

Step 1:
1 2 3
- 5 6
4 7 8

Step 2:
1 2 3
4 5 6
- 7 8

Step 3:
1 2 3
4 5 6
7 - 8

Step 4:
1 2 3
4 5 6
7 8 -

================================`,
        mappingStatus: 'verified',
      },
      {
        id: 'p1-06-b',
        subTitle: 'Program 6B — BFS for Robot Path Planning',
        uploadedFilename: 'Practical_1_BFS_Roboat_pathfinder.py',
        actualDiskAsset: 'Practical_1_BFS_Roboat_pathfinder_e1076d06.py',
        code: PYTHON_SOURCES['Practical_1_BFS_Roboat_pathfinder.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `================================
   BFS - ROBOT PATH PLANNING
================================

Grid:
. . # . .
# . # . #
. . . . #
. # # . .
. . . . .

Start: (0, 0)
Goal : (4, 4)

Shortest Path:
Step 0: (0, 0)
Step 1: (0, 1)
Step 2: (1, 1)
Step 3: (2, 1)
Step 4: (2, 2)
Step 5: (2, 3)
Step 6: (3, 3)
Step 7: (4, 3)
Step 8: (4, 4)

================================`,
        mappingStatus: 'verified',
      },
      {
        id: 'p1-06-c',
        subTitle: 'Program 6C — BFS for Blocks World',
        uploadedFilename: 'Practical_1_BFS_Blocks_World.py',
        actualDiskAsset: 'Practical_1_BFS_Blocks_World_317487d9.py',
        code: PYTHON_SOURCES['Practical_1_BFS_Blocks_World.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `================================
     BFS - BLOCKS WORLD
================================

Initial State:
A = ['A', 'B']
B = ['C']
C = []

Goal State:
A = ['A']
B = ['B']
C = ['C']

Solution:

Step 0:
A = ['A', 'B']
B = ['C']
C = []

Step 1:
A = ['A', 'B']
B = []
C = ['C']

Step 2:
A = ['A']
B = ['B']
C = ['C']

================================`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '07',
    title: 'DFS-Based Problem Solving',
    officialQuestion:
      'Use DFS for problem solving. Examples can be water jug problem , Missionaries and Cannibals ,maze solving, blocks world etc.',
    keywords: [
      'dfs',
      'depth first search',
      'water jug',
      'missionaries and cannibals',
      'maze',
      'blocks world',
    ],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-07-a',
        subTitle: 'Program 7A — DFS for Water Jug Problem (4L & 3L, Target 2L)',
        uploadedFilename: 'Practical_2_A_Water_Jug_Problem.py',
        actualDiskAsset: 'Practical_2_A_Water_Jug_Problem_4f358296.py',
        code: PYTHON_SOURCES['Practical_2_A_Water_Jug_Problem.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Solution:
Jug A: 0 Jug B: 0
Jug A: 4 Jug B: 0
Jug A: 4 Jug B: 3
Jug A: 0 Jug B: 3
Jug A: 3 Jug B: 0
Jug A: 3 Jug B: 3
Jug A: 4 Jug B: 2
Jug A: 0 Jug B: 2
Jug A: 2 Jug B: 0`,
        mappingStatus: 'verified',
      },
      {
        id: 'p1-07-b',
        subTitle: 'Program 7B — DFS for Missionaries and Cannibals',
        uploadedFilename: 'Practical_2_B_Missionaries_Cannibals.py',
        actualDiskAsset: 'Practical_2_B_Missionaries_Cannibals_6740bfbb.py',
        code: PYTHON_SOURCES['Practical_2_B_Missionaries_Cannibals.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Solution:
Missionaries: 3 Cannibals: 3 Boat: Left
Missionaries: 3 Cannibals: 1 Boat: Right
Missionaries: 3 Cannibals: 2 Boat: Left
Missionaries: 3 Cannibals: 0 Boat: Right
Missionaries: 3 Cannibals: 1 Boat: Left
Missionaries: 1 Cannibals: 1 Boat: Right
Missionaries: 2 Cannibals: 2 Boat: Left
Missionaries: 0 Cannibals: 2 Boat: Right
Missionaries: 0 Cannibals: 3 Boat: Left
Missionaries: 0 Cannibals: 1 Boat: Right
Missionaries: 1 Cannibals: 1 Boat: Left
Missionaries: 0 Cannibals: 0 Boat: Right`,
        mappingStatus: 'verified',
      },
      {
        id: 'p1-07-c',
        subTitle: 'Program 7C — DFS for Maze Problem',
        uploadedFilename: 'Practical_2_C_DFS_Maze_Problem.py',
        actualDiskAsset: 'Practical_2_C_DFS_Maze_Problem_a4e294b0.py',
        code: PYTHON_SOURCES['Practical_2_C_DFS_Maze_Problem.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `==========================================
             DFS - MAZE PROBLEM
==========================================

Maze:
S = Start   G = Goal   # = Wall
S # . . . 
. # . # . 
. . . # . 
# # . # . 
. . . . G 

----------- DFS SOLUTION -----------

Path:
Step 0: (0, 0)
Step 1: (1, 0)
Step 2: (2, 0)
Step 3: (2, 1)
Step 4: (2, 2)
Step 5: (1, 2)
Step 6: (0, 2)
Step 7: (0, 3)
Step 8: (0, 4)
Step 9: (1, 4)
Step 10: (2, 4)
Step 11: (3, 4)
Step 12: (4, 4)

Path in Maze:
* # * * * 
* # * # * 
* * * # * 
# # . # * 
. . . . * 

Goal Reached Successfully!

==========================================`,
        mappingStatus: 'verified',
      },
      {
        id: 'p1-07-d',
        subTitle: 'Program 7D — DFS for Blocks World Problem',
        uploadedFilename: 'Practical_2_D_DFS_Blocks_World.py',
        actualDiskAsset: 'Practical_2_D_DFS_Blocks_World_6868f762.py',
        code: PYTHON_SOURCES['Practical_2_D_DFS_Blocks_World.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `==========================================
       DFS - BLOCKS WORLD PROBLEM
==========================================

Initial State:
A = ['A', 'B']
B = ['C']
C = []

Goal State:
A = ['A']
B = ['B']
C = ['C']

----------- DFS SOLUTION -----------

Step 0:
A = ['A', 'B']
B = ['C']
C = []

Step 1:
A = ['A', 'B']
B = []
C = ['C']

Step 2:
A = ['A']
B = ['B']
C = ['C']

------------------------------------
Goal Reached Successfully!

==========================================`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '08',
    title: '8 Queens using Backtracking and CSP',
    officialQuestion:
      'Implement Backtracking search to solve the 8-Queens constraint satisfaction problem.',
    keywords: ['8 queens', 'eight queens', 'backtracking', 'csp', 'constraint satisfaction'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-08',
        uploadedFilename: 'Practical_3_8_Queens_Backtracking.py',
        actualDiskAsset: 'Practical_3_8_Queens_Backtracking_abd21625.py',
        code: PYTHON_SOURCES['Practical_3_8_Queens_Backtracking.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `==========================================
       8-QUEENS PROBLEM
       BACKTRACKING (CSP)
==========================================

Solution:
Q . . . . . . . 
. . . . Q . . . 
. . . . . . . Q 
. . . . . Q . . 
. . Q . . . . . 
. . . . . . Q . 
. Q . . . . . . 
. . . Q . . . . 

Queen Positions:
Queen 1: Row 1, Column 1
Queen 2: Row 2, Column 5
Queen 3: Row 3, Column 8
Queen 4: Row 4, Column 6
Queen 5: Row 5, Column 3
Queen 6: Row 6, Column 7
Queen 7: Row 7, Column 2
Queen 8: Row 8, Column 4

Goal: Place 8 queens safely on the board.

==========================================`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '09',
    title: 'Rule-Based Chatbot',
    officialQuestion: 'Develop a simple chatbot using predefined rules and pattern matching.',
    keywords: ['chatbot', 'rule-based', 'pattern matching', 'nlp', 'interactive'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p1-09',
        uploadedFilename: 'Practical_4_Rule_Based_Chatbot.py',
        actualDiskAsset: 'Practical_4_Rule_Based_Chatbot_31b2b0b7.py',
        code: PYTHON_SOURCES['Practical_4_Rule_Based_Chatbot.py'],
        inputType: 'interactive',
        sampleInput: 'hello\nwhich topic is this?\nwhat is ai?\nthank you\nbye',
        sampleOutput: `==========================================
          RULE-BASED CHATBOT
==========================================

Chatbot: Hello! I am a simple AI chatbot.
Chatbot: Type 'bye' to exit.

You: hello
Bot: Hello! How can I help you?

You: which topic is this?
Bot: Sorry, I don't understand that.

You: what is ai?
Bot: AI stands for Artificial Intelligence.

You: thank you
Bot: You're welcome!

You: bye
Bot: Goodbye! Have a nice day.

==========================================`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_01',
    practicalNumber: '10',
    title: 'Mini-Project',
    officialQuestion: 'Mini Project',
    keywords: ['mini project', 'mini-project', 'project'],
    mappingStatus: 'needs-verification',
    statusNote:
      'Content to be added — no Mini-Project topic or Python file has been supplied yet.',
    programs: [],
  },

  // =========================================================================
  // PART 02 — AI PRACTICAL EXAMINATION QUESTION BANK (16 QUESTIONS)
  // =========================================================================
  {
    part: 'PART_02',
    practicalNumber: '01',
    title: 'A* Search for 8 Puzzle',
    officialQuestion: 'Implement A* Search for 8 puzzle problem',
    keywords: ['astar', 'a*', '8 puzzle', 'search', 'heuristic'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-01',
        uploadedFilename: '01_astar_8_puzzle.py',
        actualDiskAsset: '01_astar_8_puzzle_9e5395b7.py',
        code: PYTHON_SOURCES['01_astar_8_puzzle.py'],
        inputType: 'interactive',
        sampleInput: '1 2 3 4 0 5 7 8 6\n1 2 3 4 5 6 7 8 0',
        sampleOutput: `Enter initial state: 1 2 3 4 0 5 7 8 6
Enter goal state: 1 2 3 4 5 6 7 8 0

A* Solution:
(1, 2, 3)
(4, 0, 5)
(7, 8, 6)

(1, 2, 3)
(4, 5, 0)
(7, 8, 6)

(1, 2, 3)
(4, 5, 6)
(7, 8, 0)

`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '02',
    title: 'Adversarial Search with Alpha-Beta Pruning',
    officialQuestion: 'Implement Adversarial Search with Alpha-Beta pruning',
    keywords: ['alpha-beta', 'pruning', 'adversarial', 'minimax', 'leaf values'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-02',
        uploadedFilename: '02_alpha_beta.py',
        actualDiskAsset: '02_alpha_beta_b2db53b1.py',
        code: PYTHON_SOURCES['02_alpha_beta.py'],
        inputType: 'interactive',
        sampleInput: '3 5 6 9 1 2 0 -1',
        sampleOutput: `Enter 8 leaf values: 3 5 6 9 1 2 0 -1
Optimal value: 5`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '03',
    title: 'Tower of Hanoi by State Space Search',
    officialQuestion: 'Implement Tower of Hanoi by State Space Search',
    keywords: ['tower of hanoi', 'state space', 'bfs', 'disks'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-03',
        uploadedFilename: '03_tower_of_hanoi.py',
        actualDiskAsset: '03_tower_of_hanoi_031fcd37.py',
        code: PYTHON_SOURCES['03_tower_of_hanoi.py'],
        inputType: 'interactive',
        sampleInput: '3',
        sampleOutput: `Enter number of disks: 3

Tower of Hanoi Solution:
Step 1 : Move disk 1 from A to C
Step 2 : Move disk 2 from A to B
Step 3 : Move disk 1 from C to B
Step 4 : Move disk 3 from A to C
Step 5 : Move disk 1 from B to A
Step 6 : Move disk 2 from B to C
Step 7 : Move disk 1 from A to C

Total Moves: 7`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '04',
    title: 'Sudoku Solver using Backtracking',
    officialQuestion: 'Implement a Sudoku solver using the backtracking technique.',
    keywords: ['sudoku', 'backtracking', 'csp'],
    sudokuPuzzle: SUDOKU_PUZZLE_GRID,
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-04',
        uploadedFilename: '04_sudoku_backtracking.py',
        actualDiskAsset: '04_sudoku_backtracking_fb8d3c9d.py',
        code: PYTHON_SOURCES['04_sudoku_backtracking.py'],
        inputType: 'interactive',
        sampleInput: SUDOKU_INPUT,
        sampleOutput: `Enter Sudoku (use 0 for empty cells):
${SUDOKU_INPUT}

Solved Sudoku:
${SUDOKU_OUTPUT}`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '05',
    title: 'Sudoku Solver using Constraint Propagation and Backtracking',
    officialQuestion:
      'Implement a Sudoku solver using backtracking and constraint propagation techniques.',
    keywords: ['sudoku', 'constraint propagation', 'backtracking', 'mrv'],
    sudokuPuzzle: SUDOKU_PUZZLE_GRID,
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-05',
        uploadedFilename: '05_sudoku_solver.py',
        actualDiskAsset: '05_sudoku_solver_e48df877.py',
        code: PYTHON_SOURCES['05_sudoku_solver.py'],
        inputType: 'interactive',
        sampleInput: SUDOKU_INPUT,
        sampleOutput: `Enter Sudoku (0 for empty cells):
${SUDOKU_INPUT}

Solved Sudoku:
${SUDOKU_OUTPUT}`,
        mappingStatus: 'verified',
        note: 'Uses candidates(), propagate(), and MRV backtracking in solve() for constraint propagation.',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '06',
    title: 'Local Beam Search for TSP — 4 Cities',
    officialQuestion: 'Implement Local Beam Search for The Traveling Salesman Problem (TSP).',
    keywords: ['local beam search', 'tsp', '4 cities', 'distance matrix'],
    matrix: {
      caption: 'Distance Matrix for TSP (4 Cities)',
      headers: ['A', 'B', 'C', 'D'],
      rows: [
        { label: 'A', values: [0, 10, 15, 20] },
        { label: 'B', values: [10, 0, 35, 25] },
        { label: 'C', values: [15, 35, 0, 30] },
        { label: 'D', values: [20, 25, 30, 0] },
      ],
    },
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-06',
        uploadedFilename: '06_local_beam_tsp_4cities.py',
        actualDiskAsset: '06_local_beam_tsp_4cities_2cb75f8f.py',
        code: PYTHON_SOURCES['06_local_beam_tsp_4cities.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Best Route: C -> A -> B -> D -> C
Minimum Distance: 80`,
        mappingStatus: 'verified',
        note: 'Uses fixed random.seed(42) for deterministic, reproducible initialization; optimal tour distance is 80 (15 + 10 + 25 + 30).',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '07',
    title: 'Local Beam Search for TSP — 5 Cities',
    officialQuestion: 'Implement Local Beam Search for The Traveling Salesman Problem (TSP).',
    keywords: ['local beam search', 'tsp', '5 cities', 'distance matrix'],
    matrix: {
      caption: 'Distance Matrix for TSP (5 Cities)',
      headers: ['A', 'B', 'C', 'D', 'E'],
      rows: [
        { label: 'A', values: [0, 4, 8, 10, 7] },
        { label: 'B', values: [4, 0, 6, 9, 5] },
        { label: 'C', values: [8, 6, 0, 3, 6] },
        { label: 'D', values: [10, 9, 3, 0, 4] },
        { label: 'E', values: [7, 5, 6, 4, 0] },
      ],
    },
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-07',
        uploadedFilename: '07_local_beam_tsp_5cities.py',
        actualDiskAsset: '07_local_beam_tsp_5cities_9c10b4ea.py',
        code: PYTHON_SOURCES['07_local_beam_tsp_5cities.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Best Route: D -> E -> A -> B -> C -> D
Minimum Distance: 24`,
        mappingStatus: 'verified',
        note: 'Uses fixed random.seed(42) for deterministic, reproducible initialization; optimal tour distance is 24 (4 + 7 + 4 + 6 + 3).',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '08',
    title: 'BFS — 8 Puzzle Problem',
    officialQuestion: 'Use BFS to solve a planning problem. Examples :8 puzzle problem',
    keywords: ['bfs', '8 puzzle', 'planning'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-08',
        uploadedFilename: '08_bfs_8_puzzle.py',
        actualDiskAsset: '08_bfs_8_puzzle_762823fa.py',
        code: PYTHON_SOURCES['08_bfs_8_puzzle.py'],
        inputType: 'interactive',
        sampleInput: '1 2 3 4 0 5 7 8 6\n1 2 3 4 5 6 7 8 0',
        sampleOutput: `Enter initial state: 1 2 3 4 0 5 7 8 6
Enter goal state: 1 2 3 4 5 6 7 8 0

BFS Solution:
(1, 2, 3)
(4, 0, 5)
(7, 8, 6)

(1, 2, 3)
(4, 5, 0)
(7, 8, 6)

(1, 2, 3)
(4, 5, 6)
(7, 8, 0)

`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '09',
    title: 'BFS — Robot Path Planning',
    officialQuestion: 'Use BFS to solve a planning problem. Examples: Robot path planning',
    keywords: ['bfs', 'robot path', 'planning', 'grid'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-09',
        uploadedFilename: '09_bfs_robot_path.py',
        actualDiskAsset: '09_bfs_robot_path_83b30871.py',
        code: PYTHON_SOURCES['09_bfs_robot_path.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Robot Path:
(0, 0)
(0, 1)
(1, 1)
(2, 1)
(2, 2)
(3, 2)
(3, 3)`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '10',
    title: 'BFS — Blocks World',
    officialQuestion: 'Use BFS to solve a planning problem. Examples :Blocks world',
    keywords: ['bfs', 'blocks world', 'planning'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-10',
        uploadedFilename: '10_bfs_blocks_world.py',
        actualDiskAsset: '10_bfs_blocks_world_e9dce75c.py',
        code: PYTHON_SOURCES['10_bfs_blocks_world.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Initial State:
A = ['A', 'B']
B = ['C']
C = ['D']

Goal State:
A = ['A']
B = ['C']
C = ['D', 'B']

BFS Solution:

Step 0
A = ['A', 'B']
B = ['C']
C = ['D']

Step 1
A = ['A']
B = ['C']
C = ['D', 'B']

Goal Reached Successfully!`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '11',
    title: 'DFS — Water Jug Problem (4L & 3L, Target 2L)',
    officialQuestion:
      'Use DFS for problem solving. Examples: water jug problem\nJug A: capacity 4 litres\nJug B: capacity 3 litres\nGoal: Measure exactly 2 litres in Jug A.',
    keywords: ['dfs', 'water jug', '4 litres', '3 litres', '2 litres'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-11',
        uploadedFilename: '11_dfs_water_jug_4_3.py',
        actualDiskAsset: '11_dfs_water_jug_4_3_ec5a9af1.py',
        code: PYTHON_SOURCES['11_dfs_water_jug_4_3.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Solution:
Jug A = 0 Jug B = 0
Jug A = 4 Jug B = 0
Jug A = 4 Jug B = 3
Jug A = 0 Jug B = 3
Jug A = 3 Jug B = 0
Jug A = 3 Jug B = 3
Jug A = 4 Jug B = 2
Jug A = 0 Jug B = 2
Jug A = 2 Jug B = 0`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '12',
    title: 'DFS — Water Jug Problem (5L & 3L, Target 4L)',
    officialQuestion:
      'Use DFS for problem solving. Examples: water jug problem\nJug A = 5 litres\nJug B = 3 litres\nGoal = Measure 4 litres in Jug A',
    keywords: ['dfs', 'water jug', '5 litres', '3 litres', '4 litres'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-12',
        uploadedFilename: '12_dfs_water_jug_5_3.py',
        actualDiskAsset: '12_dfs_water_jug_5_3_68c20ff4.py',
        code: PYTHON_SOURCES['12_dfs_water_jug_5_3.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Solution:
Jug A = 0 Jug B = 0
Jug A = 5 Jug B = 0
Jug A = 5 Jug B = 3
Jug A = 0 Jug B = 3
Jug A = 3 Jug B = 0
Jug A = 3 Jug B = 3
Jug A = 5 Jug B = 1
Jug A = 0 Jug B = 1
Jug A = 1 Jug B = 0
Jug A = 1 Jug B = 3
Jug A = 4 Jug B = 0`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '13',
    title: 'DFS — Missionaries and Cannibals',
    officialQuestion: 'Use DFS for problem solving. Examples: Missionaries and Cannibals',
    keywords: ['dfs', 'missionaries', 'cannibals', 'boat'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-13',
        uploadedFilename: '13_dfs_missionaries_cannibals.py',
        actualDiskAsset: '13_dfs_missionaries_cannibals_6c237b3f.py',
        code: PYTHON_SOURCES['13_dfs_missionaries_cannibals.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Solution:
Left M = 3 Left C = 3 Boat = Left
Left M = 3 Left C = 1 Boat = Right
Left M = 3 Left C = 2 Boat = Left
Left M = 3 Left C = 0 Boat = Right
Left M = 3 Left C = 1 Boat = Left
Left M = 1 Left C = 1 Boat = Right
Left M = 2 Left C = 2 Boat = Left
Left M = 0 Left C = 2 Boat = Right
Left M = 0 Left C = 3 Boat = Left
Left M = 0 Left C = 1 Boat = Right
Left M = 1 Left C = 1 Boat = Left
Left M = 0 Left C = 0 Boat = Right`,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '14',
    title: 'DFS — Maze Solving & Blocks World',
    officialQuestion: 'Use DFS for problem solving. Examples : maze solving, blocks world.',
    keywords: ['dfs', 'maze', 'blocks world', 'path'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-14-a',
        subTitle: 'Program 14A — DFS Maze Solving',
        uploadedFilename: '14_dfs_maze.py',
        actualDiskAsset: '14_dfs_maze_f2a6780b.py',
        code: PYTHON_SOURCES['14_dfs_maze.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `Maze Solution:
(0, 0)
(1, 0)
(1, 1)
(2, 1)
(3, 1)
(3, 2)
(2, 2)
(2, 3)
(3, 3)`,
        mappingStatus: 'verified',
        note: 'Implements DFS Maze Solving on the 4x4 grid.',
      },
      {
        id: 'p2-14-b',
        subTitle: 'Program 14B — DFS Blocks World Problem',
        uploadedFilename: 'Practical_2_D_DFS_Blocks_World.py',
        actualDiskAsset: 'Practical_2_D_DFS_Blocks_World_6868f762.py',
        code: PYTHON_SOURCES['Practical_2_D_DFS_Blocks_World.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `==========================================
       DFS - BLOCKS WORLD PROBLEM
==========================================

Initial State:
A = ['A', 'B']
B = ['C']
C = []

Goal State:
A = ['A']
B = ['B']
C = ['C']

----------- DFS SOLUTION -----------

Step 0:
A = ['A', 'B']
B = ['C']
C = []

Step 1:
A = ['A', 'B']
B = []
C = ['C']

Step 2:
A = ['A']
B = ['B']
C = ['C']

------------------------------------
Goal Reached Successfully!

==========================================`,
        mappingStatus: 'verified',
        note: 'Implements DFS Blocks World using a LIFO stack (from the uploaded DFS practical files).',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '15',
    title: '8-Queens Constraint Satisfaction Problem',
    officialQuestion:
      'Implement Backtracking search to solve the 8-Queens constraint satisfaction problem.',
    keywords: ['8 queens', 'eight queens', 'backtracking', 'csp'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-15',
        uploadedFilename: '15_eight_queens.py',
        actualDiskAsset: '15_eight_queens_63bb9212.py',
        code: PYTHON_SOURCES['15_eight_queens.py'],
        inputType: 'predefined',
        sampleInput: PREDEFINED_INPUT,
        sampleOutput: `8 Queens Solution:

Q . . . . . . . 
. . . . Q . . . 
. . . . . . . Q 
. . . . . Q . . 
. . Q . . . . . 
. . . . . . Q . 
. Q . . . . . . 
. . . Q . . . . `,
        mappingStatus: 'verified',
      },
    ],
  },
  {
    part: 'PART_02',
    practicalNumber: '16',
    title: 'Simple Rule-Based Chatbot',
    officialQuestion: 'Develop a simple chatbot using predefined rules and pattern matching.',
    keywords: ['chatbot', 'rule-based', 'pattern matching'],
    mappingStatus: 'verified',
    programs: [
      {
        id: 'p2-16',
        uploadedFilename: '16_simple_chatbot.py',
        actualDiskAsset: '16_simple_chatbot_20afdc11.py',
        code: PYTHON_SOURCES['16_simple_chatbot.py'],
        inputType: 'interactive',
        sampleInput: 'hi\nwhich course is this?\nwhat is your name?\nhelp me with college\nbye',
        sampleOutput: `Chatbot: Hello! Type 'bye' to exit.
You: hi
Chatbot: Hello! How can I help you?
You: which course is this?
Chatbot: Sorry, I don't understand that.
You: what is your name?
Chatbot: I am a simple Python chatbot.
You: help me with college
Chatbot: I can help you with college-related questions.
You: bye
Chatbot: Goodbye! Have a nice day.`,
        mappingStatus: 'verified',
      },
    ],
  },
];
