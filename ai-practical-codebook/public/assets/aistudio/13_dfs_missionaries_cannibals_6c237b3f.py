def safe(m_left, c_left, m_right, c_right):

    if m_left > 0 and m_left < c_left:
        return False

    if m_right > 0 and m_right < c_right:
        return False

    return True


def dfs(state, visited, path):

    if state in visited:
        return False

    visited.add(state)
    path.append(state)

    m_left, c_left, boat = state

    if state == (0, 0, 1):
        return True

    m_right = 3 - m_left
    c_right = 3 - c_left

    if boat == 0:
        moves = [(1,0), (2,0), (0,1), (0,2), (1,1)]
    else:
        moves = [(1,0), (2,0), (0,1), (0,2), (1,1)]

    for m, c in moves:

        if boat == 0:
            nm = m_left - m
            nc = c_left - c
            nb = 1
        else:
            nm = m_left + m
            nc = c_left + c
            nb = 0

        if 0 <= nm <= 3 and 0 <= nc <= 3:

            nr_m = 3 - nm
            nr_c = 3 - nc

            if safe(nm, nc, nr_m, nr_c):

                new_state = (nm, nc, nb)

                if dfs(new_state, visited, path):
                    return True

    path.pop()
    return False


path = []

dfs((3, 3, 0), set(), path)

print("Solution:")

for state in path:
    m, c, boat = state

    side = "Left" if boat == 0 else "Right"

    print(
        "Left M =", m,
        "Left C =", c,
        "Boat =", side
    )