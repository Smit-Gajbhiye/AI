grid = [
    [0, 0, 0, 0, 0, 3, 8, 0, 7],
    [0, 4, 0, 8, 0, 9, 3, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 6, 0, 5],
    [3, 0, 0, 0, 9, 0, 4, 0, 2],
    [6, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 6, 9, 1, 3, 5, 2, 7, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 6, 8, 0, 0, 0]
]


def candidates(r, c):
    used = set()

    for value in grid[r]:
        used.add(value)

    for i in range(9):
        used.add(grid[i][c])

    sr, sc = (r // 3) * 3, (c // 3) * 3

    for i in range(sr, sr + 3):
        for j in range(sc, sc + 3):
            used.add(grid[i][j])

    possible = []
    for n in range(1, 10):
        if n not in used:
            possible.append(n)

    return possible


def propagate():
    changed = True

    while changed:
        changed = False

        for r in range(9):
            for c in range(9):
                if grid[r][c] == 0:
                    possible = candidates(r, c)

                    if len(possible) == 0:
                        return False

                    if len(possible) == 1:
                        grid[r][c] = possible[0]
                        changed = True

    return True


def solve():
    if not propagate():
        return False

    best = None
    options = None

    for r in range(9):
        for c in range(9):
            if grid[r][c] == 0:
                possible = candidates(r, c)

                if not possible:
                    return False

                if options is None or len(possible) < len(options):
                    best = (r, c)
                    options = possible

    if best is None:
        return True

    r, c = best

    for num in options:
        backup = [row[:] for row in grid]
        grid[r][c] = num

        if solve():
            return True

        grid[:] = backup

    return False


if solve():
    print("Solved Sudoku:")
    for row in grid:
        print(*row)
else:
    print("No solution exists")
