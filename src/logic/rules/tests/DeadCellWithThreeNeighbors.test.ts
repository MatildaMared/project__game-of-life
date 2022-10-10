import DeadCellWithThreeNeighbors from "../DeadCellWithThreeNeighbors";

describe("Dead cell with three neighbors rule", () => {
	test("rule only applies to dead cells", () => {
		const isAlive = false;
		const rule = new DeadCellWithThreeNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
	});

	test("a dead cell with three neighbors becomes alive", () => {
		const isAlive = false;
		const numberOfNeighbors = 3;
		const rule = new DeadCellWithThreeNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);
	});

	test("a dead cell with less than or more than three neighbors stays dead", () => {
		const isAlive = false;
		let numberOfNeighbors = 1;
		const rule = new DeadCellWithThreeNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 2;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 4;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 5;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});
});
