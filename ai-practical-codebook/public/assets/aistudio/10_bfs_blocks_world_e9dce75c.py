
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

                new_state = [list(stack) for stack in state]

                block = new_state[i].pop()
                new_state[j].append(block)

                new_state = tuple(tuple(stack) for stack in new_state)

                if new_state not in visited:
                    visited.add(new_state)
                    queue.append((new_state, path + [new_state]))

    return None


def display(state):
    print("A =", list(state[0]))
    print("B =", list(state[1]))
    print("C =", list(state[2]))


start = (
    ("A", "B"),
    ("C",),
    ("D",)
)

goal = (
    ("A",),
    ("C",),
    ("D", "B")
)

print("Initial State:")
display(start)

print("\nGoal State:")
display(goal)

path = bfs(start, goal)

if path:
    print("\nBFS Solution:")

    for i, state in enumerate(path):
        print("\nStep", i)
        display(state)

    print("\nGoal Reached Successfully!")

else:
    print("No solution found.")
