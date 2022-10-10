import LivingCellWithOneOrLessNeighbors from "../LivingCellWithOneOrLessNeighbors";

describe("Living cell with one or less neighbors rule", () => {
	test("rule does not apply to dead cells", () => {
		const isAlive = false;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive)).toBe(false);
	});

	test("a living cell with one neighbor does not survive", () => {
		const isAlive = true;
		const numberOfNeighbors = 1;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});

	test("a living cell with no neighbors does not survive", () => {
		const isAlive = true;
		const numberOfNeighbors = 0;
		const rule = new LivingCellWithOneOrLessNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(false);
	});
});
