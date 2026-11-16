def dfs(start, goal):
    stack = [(start, [start])]
    visited = {start}

    while stack:
        state, path = stack.pop()

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
                    stack.append((new_state, path + [new_state]))

    return None


def show(state):
    print("A =", list(state[0]))
    print("B =", list(state[1]))
    print("C =", list(state[2]))


print("==========================================")
print("       DFS - BLOCKS WORLD PROBLEM")
print("==========================================")

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

path = dfs(start, goal)

if path:
    print("\n----------- DFS SOLUTION -----------")

    for i, state in enumerate(path):
        print("\nStep %d:" % i)
        show(state)

    print("\n------------------------------------")
    print("Goal Reached Successfully!")
else:
    print("\nNo solution found.")

print("\n==========================================")