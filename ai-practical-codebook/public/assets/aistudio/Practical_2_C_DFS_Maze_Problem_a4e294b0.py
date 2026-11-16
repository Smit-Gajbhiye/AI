def dfs(maze, start, goal):
    stack = [(start, [start])]
    visited = {start}

    while stack:
        position, path = stack.pop()

        if position == goal:
            return path

        r, c = position

        directions = [
            (1, 0),
            (0, 1),
            (-1, 0),
            (0, -1)
        ]

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if (0 <= nr < len(maze) and
                    0 <= nc < len(maze[0]) and
                    maze[nr][nc] == 0 and
                    (nr, nc) not in visited):

                visited.add((nr, nc))
                stack.append(((nr, nc), path + [(nr, nc)]))

    return None


def show_maze(maze, path=None):
    path = set(path or [])

    for r in range(len(maze)):
        row = ""

        for c in range(len(maze[0])):
            if (r, c) in path:
                row += "* "
            elif maze[r][c] == 1:
                row += "# "
            else:
                row += ". "

        print(row)


print("==========================================")
print("             DFS - MAZE PROBLEM")
print("==========================================")

maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0]
]

start = (0, 0)
goal = (4, 4)

print("\nMaze:")
print("S = Start   G = Goal   # = Wall")

for r in range(len(maze)):
    row = ""
    for c in range(len(maze[0])):
        if (r, c) == start:
            row += "S "
        elif (r, c) == goal:
            row += "G "
        elif maze[r][c] == 1:
            row += "# "
        else:
            row += ". "
    print(row)

path = dfs(maze, start, goal)

if path:
    print("\n----------- DFS SOLUTION -----------")

    print("\nPath:")
    for i, position in enumerate(path):
        print("Step %d: %s" % (i, position))

    print("\nPath in Maze:")
    show_maze(maze, path)

    print("\nGoal Reached Successfully!")
else:
    print("\nNo path found.")

print("\n==========================================")