def dfs(a, b, visited, path):
    if (a, b) in visited:
        return None

    visited.add((a, b))
    path.append((a, b))

    if a == 2:
        return path.copy()

    operations = [
        (4, b),                         # Fill Jug A
        (a, 3),                         # Fill Jug B
        (0, b),                         # Empty Jug A
        (a, 0),                         # Empty Jug B
        (a - min(a, 3 - b), b + min(a, 3 - b)),  # A to B
        (a + min(b, 4 - a), b - min(b, 4 - a))   # B to A
    ]

    for state in operations:
        result = dfs(state[0], state[1], visited, path)
        if result:
            return result

    path.pop()
    return None


solution = dfs(0, 0, set(), [])

if solution:
    print("Solution:")
    for state in solution:
        print("Jug A:", state[0], "Jug B:", state[1])
else:
    print("No solution found")
