maze = [
    ['S', '.', '#', '.'],
    ['.', '.', '#', '.'],
    ['#', '.', '.', '.'],
    ['.', '.', '.', 'G']
]

rows = len(maze)
cols = len(maze[0])

start = (0, 0)
goal = (3, 3)


def dfs(position, visited, path):

    if position in visited:
        return False

    visited.add(position)
    path.append(position)

    if position == goal:
        return True

    moves = [(1,0), (-1,0), (0,1), (0,-1)]

    for dr, dc in moves:

        r = position[0] + dr
        c = position[1] + dc

        if 0 <= r < rows and 0 <= c < cols:

            if maze[r][c] != '#':

                if dfs((r, c), visited, path):
                    return True

    path.pop()
    return False


path = []

if dfs(start, set(), path):

    print("Maze Solution:")

    for p in path:
        print(p)

else:
    print("No path found.")