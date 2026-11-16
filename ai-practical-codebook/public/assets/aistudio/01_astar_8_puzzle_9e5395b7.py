
import heapq

def heuristic(state, goal):
    count = 0
    for i in range(9):
        if state[i] != 0 and state[i] != goal[i]:
            count += 1
    return count


def get_neighbors(state):
    neighbors = []
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

            neighbors.append(tuple(new_state))

    return neighbors


def astar(start, goal):
    pq = []
    heapq.heappush(pq, (heuristic(start, goal), 0, start))

    cost = {start: 0}
    parent = {start: None}

    while pq:
        f, g, current = heapq.heappop(pq)

        if g != cost[current]:
            continue

        if current == goal:
            path = []

            while current is not None:
                path.append(current)
                current = parent[current]

            return path[::-1]

        for neighbor in get_neighbors(current):
            new_cost = g + 1

            if neighbor not in cost or new_cost < cost[neighbor]:
                cost[neighbor] = new_cost
                parent[neighbor] = current

                f = new_cost + heuristic(neighbor, goal)

                heapq.heappush(pq, (f, new_cost, neighbor))

    return None


start = tuple(map(int, input("Enter initial state: ").split()))
goal = tuple(map(int, input("Enter goal state: ").split()))

if len(start) == 9 and len(goal) == 9 and \
   sorted(start) == list(range(9)) and \
   sorted(goal) == list(range(9)):

    path = astar(start, goal)

    if path:
        print("\nA* Solution:")

        for state in path:
            print(state[0:3])
            print(state[3:6])
            print(state[6:9])
            print()
    else:
        print("No solution found.")

else:
    print("Invalid puzzle input.")
