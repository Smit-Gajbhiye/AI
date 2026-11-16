import heapq

GOAL = (1, 2, 3,
        4, 5, 6,
        7, 8, 0)


def show(s):
    for i in range(0, 9, 3):
        row = []
        for x in s[i:i + 3]:
            if x == 0:
                row.append("-")
            else:
                row.append(str(x))
        print(" ".join(row))


def h(s):
    total = 0
    for i, x in enumerate(s):
        if x != 0:
            goal_index = GOAL.index(x)
            total += abs(i // 3 - goal_index // 3)
            total += abs(i % 3 - goal_index % 3)
    return total


def astar(start):
    q = [(h(start), 0, start, [start])]
    seen = set()

    while q:
        f, g, s, path = heapq.heappop(q)

        if s in seen:
            continue
        seen.add(s)

        if s == GOAL:
            print("\nSolution:")

            for k in range(0, len(path), 3):
                states = path[k:k + 3]

                print()
                for i in range(len(states)):
                    print("Step %d" % (k + i), end="    ")
                print()

                for r in range(3):
                    for state in states:
                        row = []
                        for x in state[r * 3:r * 3 + 3]:
                            if x == 0:
                                row.append("-")
                            else:
                                row.append(str(x))
                        print(" ".join(row), end="        ")
                    print()
            return

        z = s.index(0)
        r, c = divmod(z, 3)

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            R, C = r + dr, c + dc

            if 0 <= R < 3 and 0 <= C < 3:
                n = R * 3 + C
                t = list(s)
                t[z], t[n] = t[n], t[z]
                t = tuple(t)

                if t not in seen:
                    heapq.heappush(q, (g + 1 + h(t), g + 1, t, path + [t]))


print("A* SEARCH - 8 PUZZLE\n")

print("Enter Initial State :")
start = []

for i in range(3):
    row = input().split()
    values = []
    for x in row:
        if x == "-":
            values.append(0)
        else:
            values.append(int(x))
    start += values

start = tuple(start)

print("\nInitial State:")
show(start)

print("\nGoal State:")
show(GOAL)

astar(start)