import LivingCellWithTwoOrThreeNeighbors from "../LivingCellWithTwoOrThreeNeighbors";

describe("Living cell with two or three neighbors rule", () => {
	test("rule only applies to living cells with two or three neighbors", () => {
		const isAlive = true;
		let numberOfNeighbors = 2;
		const rule = new LivingCellWithTwoOrThreeNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 3;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
	});

	test("rule does not apply to living cells with less than two neighbors", () => {
		const isAlive = true;
		let numberOfNeighbors = 0;
		const rule = new LivingCellWithTwoOrThreeNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 1;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(false);
	});

	test("rule does not apply to living cells with more than three neighbors", () => {
		const isAlive = true;
		let numberOfNeighbors = 4;
		const rule = new LivingCellWithTwoOrThreeNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 5;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(false);
	});

	test("a living cell with two or three neighbors survives", () => {
		const isAlive = true;
		let numberOfNeighbors = 2;
		const rule = new LivingCellWithTwoOrThreeNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 3;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);
	});
});
