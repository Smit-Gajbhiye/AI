def is_valid(m, c):
    if m < 0 or c < 0 or m > 3 or c > 3:
        return False

    if m > 0 and c > m:
        return False

    rm, rc = 3 - m, 3 - c
    if rm > 0 and rc > rm:
        return False

    return True


def dfs(state, visited, path):
    if state in visited:
        return False

    visited.add(state)
    path.append(state)

    m, c, boat = state

    if m == 0 and c == 0 and boat == 0:
        return True

    moves = [(1, 0), (2, 0), (0, 1), (0, 2), (1, 1)]

    for dm, dc in moves:
        if boat == 1:
            new_state = (m - dm, c - dc, 0)
        else:
            new_state = (m + dm, c + dc, 1)

        if is_valid(new_state[0], new_state[1]):
            if dfs(new_state, visited, path):
                return True

    path.pop()
    return False


path = []
start = (3, 3, 1)

if dfs(start, set(), path):
    print("Solution:")
    for m, c, boat in path:
        side = "Left" if boat == 1 else "Right"
        print("Missionaries:", m, "Cannibals:", c,
              "Boat:", side)
else:
    print("No solution found")
