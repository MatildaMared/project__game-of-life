import LivingCellWithFourOrMoreNeighbors from "../LivingCellWithFourOrMoreNeighbors";

describe("Living cell with four or more neighbors rule", () => {
	test("rule only applies to living cells with four or more neighbors", () => {
		const isAlive = false;
		let numberOfNeighbors = 4;
		const rule = new LivingCellWithFourOrMoreNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 5;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
	});

	test("a living cell with four or more neighbors does not survive", () => {
		const isAlive = true;
		let numberOfNeighbors = 4;
		const rule = new LivingCellWithFourOrMoreNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 5;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 6;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});
});
