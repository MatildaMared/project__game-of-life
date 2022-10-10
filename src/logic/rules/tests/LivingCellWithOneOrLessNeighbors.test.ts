import LivingCellWithOneOrLessNeighbors from "../LivingCellWithOneOrLessNeighbors";

describe("Living cell with one or less neighbors rule", () => {
	test("only applies to living cells with one or less neighbors", () => {
		const isAlive = true;
		let numberOfNeighbors = 0;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 1;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
	});

	test("rule does not apply for living cells with more than one neighbor", () => {
		const isAlive = true;
		let numberOfNeighbors = 2;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(false);

		numberOfNeighbors = 3;
		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(false);
	});

	test("a living cell with one neighbor does not survive", () => {
		const isAlive = true;
		const numberOfNeighbors = 1;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});

	test("a living cell with no neighbors does not survive", () => {
		const isAlive = true;
		const numberOfNeighbors = 0;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive, numberOfNeighbors)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});
});
