from collections import deque

GOAL = (1, 2, 3,
        4, 5, 6,
        7, 8, 0)


def show(state):
    for i in range(0, 9, 3):
        row = []
        for x in state[i:i + 3]:
            if x == 0:
                row.append("-")
            else:
                row.append(str(x))
        print(" ".join(row))


def bfs(start):
    queue = deque([(start, [start])])
    visited = {start}

    while queue:
        state, path = queue.popleft()

        if state == GOAL:
            return path

        z = state.index(0)
        r, c = divmod(z, 3)

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            R, C = r + dr, c + dc

            if 0 <= R < 3 and 0 <= C < 3:
                n = R * 3 + C
                new = list(state)
                new[z], new[n] = new[n], new[z]
                new = tuple(new)

                if new not in visited:
                    visited.add(new)
                    queue.append((new, path + [new]))

    return None


print("================================")
print("       BFS - 8 PUZZLE")
print("================================")

start = (
    1, 2, 3,
    5, 0, 6,
    4, 7, 8
)

print("\nInitial State:")
show(start)

print("\nGoal State:")
show(GOAL)

path = bfs(start)

if path:
    print("\nSolution:")

    for i, state in enumerate(path):
        print("\nStep %d:" % i)
        show(state)
else:
    print("\nNo solution exists.")

print("\n================================")