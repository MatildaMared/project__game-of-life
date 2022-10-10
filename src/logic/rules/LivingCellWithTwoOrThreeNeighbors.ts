import { Rule } from "../../interfaces/Rule";

export default class LivingCellWithTwoOrThreeNeighbors implements Rule {
	applies(isAlive: boolean, numberOfNeighbors: number): boolean {
		return isAlive && (numberOfNeighbors === 2 || numberOfNeighbors === 3);
	}

	shouldLive(numberOfNeighbors: number): boolean {
		if (numberOfNeighbors === 2 || numberOfNeighbors === 3) {
			return true;
		}
		return false;
	}
}
