from collections import deque


def bfs(start, goal):
    queue = deque([(start, [start])])
    visited = {start}

    while queue:
        state, path = queue.popleft()

        if state == goal:
            return path

        for i in range(3):
            if not state[i]:
                continue

            for j in range(3):
                if i == j:
                    continue

                new_state = [list(x) for x in state]
                block = new_state[i].pop()
                new_state[j].append(block)

                new_state = tuple(tuple(x) for x in new_state)

                if new_state not in visited:
                    visited.add(new_state)
                    queue.append((new_state, path + [new_state]))

    return None


def show(state):
    print("A =", list(state[0]))
    print("B =", list(state[1]))
    print("C =", list(state[2]))


print("================================")
print("     BFS - BLOCKS WORLD")
print("================================")

start = (
    ('A', 'B'),
    ('C',),
    ()
)

goal = (
    ('A',),
    ('B',),
    ('C',)
)

print("\nInitial State:")
show(start)

print("\nGoal State:")
show(goal)

path = bfs(start, goal)

if path:
    print("\nSolution:")

    for i, state in enumerate(path):
        print("\nStep %d:" % i)
        show(state)
else:
    print("\nNo solution found.")

print("\n================================")