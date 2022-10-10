import { Position } from "../../interfaces/Position";
import { Grid } from "../../types/Grid";

export class GameOfLife {
	createInitialGrid(numberOfRows: number): Grid {
		const grid: Grid = [];

		for (let i = 0; i < numberOfRows; i++) {
			grid.push(Array.from(Array(numberOfRows * 2), () => 0));
		}
		return grid;
	}

	toggleCell(grid: Grid, position: Position): Grid {
		const { row, column } = position;
		const newGrid = [...grid];

		newGrid[row][column] = newGrid[row][column] === 0 ? 1 : 0;

		return newGrid;
	}
}
