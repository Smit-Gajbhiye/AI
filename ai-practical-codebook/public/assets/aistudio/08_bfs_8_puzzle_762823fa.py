from collections import deque


def neighbors(state):
    result = []

    zero = state.index(0)
    row, col = divmod(zero, 3)

    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for dr, dc in moves:

        r = row + dr
        c = col + dc

        if 0 <= r < 3 and 0 <= c < 3:

            new_state = list(state)
            new_zero = r * 3 + c

            new_state[zero], new_state[new_zero] = \
                new_state[new_zero], new_state[zero]

            result.append(tuple(new_state))

    return result


def bfs(start, goal):

    queue = deque([start])
    visited = {start}
    parent = {start: None}

    while queue:

        current = queue.popleft()

        if current == goal:

            path = []

            while current:
                path.append(current)
                current = parent[current]

            return path[::-1]

        for next_state in neighbors(current):

            if next_state not in visited:
                visited.add(next_state)
                parent[next_state] = current
                queue.append(next_state)

    return None


start = tuple(map(int, input("Enter initial state: ").split()))
goal = tuple(map(int, input("Enter goal state: ").split()))

path = bfs(start, goal)

if path:

    print("\nBFS Solution:")

    for state in path:
        print(state[0:3])
        print(state[3:6])
        print(state[6:9])
        print()

else:
    print("No solution.")