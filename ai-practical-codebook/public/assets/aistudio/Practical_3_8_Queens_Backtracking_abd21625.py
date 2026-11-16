def is_safe(board, row, col):
    for i in range(row):
        if board[i] == col:
            return False

        if abs(board[i] - col) == abs(i - row):
            return False

    return True


def solve(board, row):
    if row == 8:
        return True

    for col in range(8):
        if is_safe(board, row, col):
            board[row] = col

            if solve(board, row + 1):
                return True

            board[row] = -1

    return False


def display(board):
    for row in range(8):
        for col in range(8):
            if board[row] == col:
                print("Q", end=" ")
            else:
                print(".", end=" ")
        print()


print("==========================================")
print("       8-QUEENS PROBLEM")
print("       BACKTRACKING (CSP)")
print("==========================================")

board = [-1] * 8

if solve(board, 0):
    print("\nSolution:")
    display(board)

    print("\nQueen Positions:")
    for row in range(8):
        print("Queen %d: Row %d, Column %d" % (row + 1, row + 1, board[row] + 1))

    print("\nGoal: Place 8 queens safely on the board.")
else:
    print("\nNo solution exists.")

print("\n==========================================")