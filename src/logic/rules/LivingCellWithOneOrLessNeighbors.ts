import { Rule } from "../../interfaces/Rule";

export default class LivingCellWithOneOrLessNeighbors implements Rule {
	applies(isAlive: boolean, numberOfNeighbors: number): boolean {
		return isAlive && numberOfNeighbors <= 1;
	}

	shouldLive(numberOfNeighbors: number): boolean {
		if (numberOfNeighbors <= 1) {
			return false;
		}
		return true;
	}
}
