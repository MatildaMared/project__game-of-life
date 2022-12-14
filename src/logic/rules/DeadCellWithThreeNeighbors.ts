import { Rule } from "../../interfaces/Rule";

export default class DeadCellWithThreeNeighbors implements Rule {
	applies(isAlive: boolean, numberOfNeighbors: number): boolean {
		return !isAlive && numberOfNeighbors === 3;
	}

	shouldLive(numberOfNeighbors: number): boolean {
		if (numberOfNeighbors === 3) {
			return true;
		}
		return false;
	}
}
