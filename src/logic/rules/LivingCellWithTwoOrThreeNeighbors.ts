import { Rule } from "../../interfaces/Rule";

export default class LivingCellWithTwoOrThreeNeighbors implements Rule {
	applies(isAlive: boolean): boolean {
		return isAlive;
	}

	shouldLive(numberOfNeighbors: number): boolean {
		return numberOfNeighbors === 2 || numberOfNeighbors === 3;
    }
}
