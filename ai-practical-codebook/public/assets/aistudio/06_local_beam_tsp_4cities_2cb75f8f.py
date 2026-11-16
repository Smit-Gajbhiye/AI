import random

random.seed(42)

distance = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]

cities = ['A', 'B', 'C', 'D']


def cost(route):
    total = 0

    for i in range(len(route) - 1):
        total += distance[route[i]][route[i + 1]]

    total += distance[route[-1]][route[0]]

    return total


def local_beam_search(k=3, iterations=100):

    states = []

    for _ in range(k):
        route = list(range(4))
        random.shuffle(route)
        states.append(route)

    for _ in range(iterations):

        candidates = []

        for route in states:

            for i in range(1, 4):
                for j in range(i + 1, 4):

                    new_route = route.copy()
                    new_route[i], new_route[j] = new_route[j], new_route[i]

                    candidates.append(new_route)

        candidates.sort(key=cost)

        states = candidates[:k]

    return min(states, key=cost)


best = local_beam_search()

print("Best Route:", " -> ".join(cities[i] for i in best), "->", cities[best[0]])
print("Minimum Distance:", cost(best))