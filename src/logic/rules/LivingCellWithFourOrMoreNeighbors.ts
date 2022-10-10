import { Rule } from "../../interfaces/Rule";

export default class LivingCellWithFourOrMoreNeighbors implements Rule {
	applies(isAlive: boolean): boolean {
		return isAlive;
	}

	shouldLive(numberOfNeighbors: number): boolean {
		return !(numberOfNeighbors >= 4);
	}
}
