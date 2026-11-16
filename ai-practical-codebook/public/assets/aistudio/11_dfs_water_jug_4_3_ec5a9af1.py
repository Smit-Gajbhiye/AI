def dfs(a, b, visited, path):

    if (a, b) in visited:
        return False

    visited.add((a, b))
    path.append((a, b))

    if a == 2:
        return True

    states = [
        (4, b),                 # Fill A
        (a, 3),                 # Fill B
        (0, b),                 # Empty A
        (a, 0),                 # Empty B
        (a - min(a, 3-b), b + min(a, 3-b)),  # A -> B
        (a + min(b, 4-a), b - min(b, 4-a))   # B -> A
    ]

    for state in states:
        if dfs(state[0], state[1], visited, path):
            return True

    path.pop()
    return False


path = []

if dfs(0, 0, set(), path):

    print("Solution:")

    for state in path:
        print("Jug A =", state[0], "Jug B =", state[1])

else:
    print("No solution.")