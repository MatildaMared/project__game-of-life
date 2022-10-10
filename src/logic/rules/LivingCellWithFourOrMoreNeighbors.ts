import { Rule } from "../../interfaces/Rule";

export default class LivingCellWithFourOrMoreNeighbors implements Rule {
	applies(isAlive: boolean, numberOfNeighbors: number): boolean {
		return isAlive && numberOfNeighbors >= 4;
	}

	shouldLive(numberOfNeighbors: number): boolean {
		if (numberOfNeighbors >= 4) {
			return false;
		}
		return true;
	}
}
