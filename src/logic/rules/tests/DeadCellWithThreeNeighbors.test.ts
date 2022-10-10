import DeadCellWithThreeNeighbors from "../DeadCellWithThreeNeighbors";

describe("Dead cell with three neighbors rule", () => {
	test("rule only applies to dead cells with three neighbors", () => {
		const isAlive = false;
		const numberOfNeighbors = 3;
		const rule = new DeadCellWithThreeNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
	});

	test("a dead cell with three neighbors becomes alive", () => {
		const isAlive = false;
		const numberOfNeighbors = 3;
		const rule = new DeadCellWithThreeNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);
	});
});
