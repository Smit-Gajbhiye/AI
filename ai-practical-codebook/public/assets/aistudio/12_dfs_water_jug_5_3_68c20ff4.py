def dfs(a, b, visited, path):

    if (a, b) in visited:
        return False

    visited.add((a, b))
    path.append((a, b))

    if a == 4:
        return True

    states = [
        (5, b),
        (a, 3),
        (0, b),
        (a, 0),
        (a - min(a, 3-b), b + min(a, 3-b)),
        (a + min(b, 5-a), b - min(b, 5-a))
    ]

    for state in states:
        if dfs(state[0], state[1], visited, path):
            return True

    path.pop()
    return False


path = []

if dfs(0, 0, set(), path):

    print("Solution:")

    for a, b in path:
        print("Jug A =", a, "Jug B =", b)

else:
    print("No solution.")