def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num:
            return False

    for i in range(9):
        if board[i][col] == num:
            return False

    start_row = (row // 3) * 3
    start_col = (col // 3) * 3

    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            if board[i][j] == num:
                return False

    return True


def solve(board):
    for row in range(9):
        for col in range(9):

            if board[row][col] == 0:
                for num in range(1, 10):

                    if is_valid(board, row, col, num):
                        board[row][col] = num

                        if solve(board):
                            return True

                        board[row][col] = 0

                return False

    return True


print("Enter Sudoku (use 0 for empty cells):")

board = []
for i in range(9):
    board.append(list(map(int, input().split())))

if solve(board):
    print("\nSolved Sudoku:")
    for row in board:
        print(*row)
else:
    print("No solution exists.")