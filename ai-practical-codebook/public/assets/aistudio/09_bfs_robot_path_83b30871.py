from collections import deque

grid = [
    ['S', '.', '.', '#'],
    ['#', '.', '#', '.'],
    ['.', '.', '.', '.'],
    ['#', '#', '.', 'G']
]

rows = len(grid)
cols = len(grid[0])

start = (0, 0)
goal = (3, 3)


def bfs():

    queue = deque([start])
    visited = {start}
    parent = {start: None}

    moves = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    while queue:

        current = queue.popleft()

        if current == goal:
            path = []

            while current:
                path.append(current)
                current = parent[current]

            return path[::-1]

        for dr, dc in moves:

            nr = current[0] + dr
            nc = current[1] + dc

            if 0 <= nr < rows and 0 <= nc < cols:
                if grid[nr][nc] != '#' and (nr, nc) not in visited:

                    visited.add((nr, nc))
                    parent[(nr, nc)] = current
                    queue.append((nr, nc))

    return None


path = bfs()

print("Robot Path:")

for position in path:
    print(position)