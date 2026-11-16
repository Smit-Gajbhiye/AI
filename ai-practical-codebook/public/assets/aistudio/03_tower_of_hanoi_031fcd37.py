
from collections import deque

def bfs(n):
    start = (tuple(range(n, 0, -1)), (), ())
    goal = ((), (), tuple(range(n, 0, -1)))

    queue = deque([(start, [])])
    visited = {start}

    while queue:
        state, path = queue.popleft()

        if state == goal:
            return path

        for i in range(3):
            if not state[i]:
                continue

            disk = state[i][-1]

            for j in range(3):
                if i == j:
                    continue

                # Check legal move
                if state[j] and state[j][-1] < disk:
                    continue

                new_state = [list(rod) for rod in state]

                new_state[i].pop()
                new_state[j].append(disk)

                new_state = tuple(tuple(rod) for rod in new_state)

                if new_state not in visited:
                    visited.add(new_state)

                    move = (disk, i, j)
                    queue.append((new_state, path + [move]))

    return None


n = int(input("Enter number of disks: "))

if n <= 0:
    print("Enter a positive number.")
else:
    solution = bfs(n)

    rods = ["A", "B", "C"]

    if solution is not None:
        print("\nTower of Hanoi Solution:")

        for step, move in enumerate(solution, 1):
            disk, source, destination = move

            print("Step", step, ": Move disk", disk,
                  "from", rods[source], "to", rods[destination])

        print("\nTotal Moves:", len(solution))
    else:
        print("No solution found.")
