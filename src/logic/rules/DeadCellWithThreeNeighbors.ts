import { Rule } from "../../interfaces/Rule";

export default class DeadCellWithThreeNeighbors implements Rule {
	applies(isAlive: boolean): boolean {
		return !isAlive;
	}

	shouldLive(numberOfNeighbors: number): boolean {
		return numberOfNeighbors === 3;
	}
}
