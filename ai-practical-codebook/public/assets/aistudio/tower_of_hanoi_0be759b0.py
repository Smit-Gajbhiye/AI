def hanoi(n, source, target, aux):
    if n == 0:
        return

    hanoi(n - 1, source, aux, target)

    print("Move Disk %d: %s -> %s" % (n, source, target))

    hanoi(n - 1, aux, target, source)


print("================================")
print("        TOWER OF HANOI")
print("================================")

n = int(input("Enter number of disks: "))

print("\nInitial State:")
print("A =", list(range(n, 0, -1)))
print("B = []")
print("C = []")

print("\nSolution:")
hanoi(n, "A", "C", "B")

print("\nGoal State:")
print("A = []")
print("B = []")
print("C =", list(range(n, 0, -1)))

print("\n================================")
print("Total Moves:", 2 ** n - 1)
print("================================")