from collections import deque


def bfs(grid, start, goal):
    rows = len(grid)
    cols = len(grid[0])

    queue = deque([(start, [start])])
    visited = {start}

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while queue:
        (r, c), path = queue.popleft()

        if (r, c) == goal:
            return path

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if (0 <= nr < rows and
                    0 <= nc < cols and
                    grid[nr][nc] == 0 and
                    (nr, nc) not in visited):

                visited.add((nr, nc))
                queue.append(((nr, nc), path + [(nr, nc)]))

    return None


print("================================")
print("   BFS - ROBOT PATH PLANNING")
print("================================")

grid = [
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
]

start = (0, 0)
goal = (4, 4)

print("\nGrid:")
for row in grid:
    print(" ".join("#" if x == 1 else "." for x in row))

print("\nStart:", start)
print("Goal :", goal)

path = bfs(grid, start, goal)

if path:
    print("\nShortest Path:")
    for i, position in enumerate(path):
        print("Step %d: %s" % (i, position))
else:
    print("\nNo path found.")

print("\n================================")