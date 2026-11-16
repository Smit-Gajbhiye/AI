import random


def cost(route):
    total = 0

    for i in range(len(route) - 1):
        total += dist[route[i]][route[i + 1]]

    return total + dist[route[-1]][route[0]]


def beam_search(k=3, iterations=100):
    beam = [list(range(5))]
    best = beam[0]

    for _ in range(iterations):
        candidates = []

        for route in beam:
            for i in range(1, 5):
                for j in range(i + 1, 5):
                    new_route = route[:]
                    new_route[i], new_route[j] = new_route[j], new_route[i]
                    candidates.append(new_route)

        candidates.sort(key=cost)

        beam = []
        for route in candidates:
            if route not in beam:
                beam.append(route)

            if len(beam) == k:
                break

        if cost(beam[0]) < cost(best):
            best = beam[0]

    return best


cities = ['A', 'B', 'C', 'D', 'E']

dist = [
    [0, 4, 8, 10, 7],
    [4, 0, 6, 9, 5],
    [8, 6, 0, 3, 6],
    [10, 9, 3, 0, 4],
    [7, 5, 6, 4, 0]
]

best = beam_search()

print("Best Route:")
print(" -> ".join(cities[i] for i in best), "->", cities[best[0]])
print("Minimum Distance:", cost(best))
