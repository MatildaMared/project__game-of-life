import LivingCellWithTwoOrThreeNeighbors from "../LivingCellWithTwoOrThreeNeighbors";

describe("Living cell with two or three neighbors rule", () => {
	test("rule does not apply to dead cells", () => {
		const isAlive = false;
		const rule = new LivingCellWithTwoOrThreeNeighbors();

		expect(rule.applies(isAlive)).toBe(false);
	});

	test("a living cell with two or three neighbors survives", () => {
		const isAlive = true;
		let numberOfNeighbors = 2;
		const rule = new LivingCellWithTwoOrThreeNeighbors();

		expect(rule.applies(isAlive)).toBe(true);
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);

		numberOfNeighbors = 3;
		expect(rule.shouldLive(numberOfNeighbors)).toBe(true);
	});
});
