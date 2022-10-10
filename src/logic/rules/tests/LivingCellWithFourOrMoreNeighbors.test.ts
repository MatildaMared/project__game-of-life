import LivingCellWithFourOrMoreNeighbors from "../LivingCellWithFourOrMoreNeighbors";

describe("Living cell with four or more neighbors rule", () => {
	test("rule does not apply to dead cells", () => {
		const isAlive = false;
		const rule = new LivingCellWithFourOrMoreNeighbors();

		expect(rule.applies(isAlive)).toBe(false);
	});

	test("a living cell with four or more neighbors does not survive", () => {
		const isAlive = true;
		let numberOfNeighbors = 4;
		const rule = new LivingCellWithFourOrMoreNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 5;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 6;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});

	test("a living cell with less than four neighbors survives", () => {
		const isAlive = true;
		let numberOfNeighbors = 1;
		const rule = new LivingCellWithFourOrMoreNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 2;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 1;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);
	});
});
