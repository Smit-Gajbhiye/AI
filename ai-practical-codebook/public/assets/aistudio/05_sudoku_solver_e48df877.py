
def candidates(board, row, col):
    used = set(board[row])

    for i in range(9):
        used.add(board[i][col])

    start_row = (row // 3) * 3
    start_col = (col // 3) * 3

    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            used.add(board[i][j])

    return [n for n in range(1, 10) if n not in used]


def propagate(board):
    changed = True

    while changed:
        changed = False

        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    possible = candidates(board, row, col)

                    if len(possible) == 0:
                        return False

                    if len(possible) == 1:
                        board[row][col] = possible[0]
                        changed = True

    return True


def solve(board):
    if not propagate(board):
        return False

    best_row = -1
    best_col = -1
    best_options = None

    # Find empty cell with minimum candidates
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                possible = candidates(board, row, col)

                if len(possible) == 0:
                    return False

                if best_options is None or len(possible) < len(best_options):
                    best_row = row
                    best_col = col
                    best_options = possible

    if best_options is None:
        return True

    for num in best_options:
        backup = [row[:] for row in board]

        board[best_row][best_col] = num

        if solve(board):
            return True

        # Restore board if guess fails
        for i in range(9):
            board[i] = backup[i]

    return False


board = []

print("Enter Sudoku (0 for empty cells):")

for i in range(9):
    board.append(list(map(int, input().split())))

if solve(board):
    print("\nSolved Sudoku:")

    for row in board:
        print(*row)
else:
    print("No solution exists.")
