import { Position } from "../../interfaces/Position";
import { Rule } from "../../interfaces/Rule";
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

	applyRules(
		numberOfNeighbors: number,
		isAlive: boolean,
		rules: Rule[]
	): boolean {
		return false;
	}

	calculateNextFrame(currentGrid: Grid): Grid {
		const newGrid = [...currentGrid];

		return newGrid;
	}

	calculateNumberOfNeighbors(grid: Grid, position: Position): number {
		const { row, column } = position;
		let numberOfNeighbors = 0;

		grid[row - 1][column - 1] === 1 && numberOfNeighbors++;
		grid[row - 1][column] === 1 && numberOfNeighbors++;
		grid[row - 1][column + 1] === 1 && numberOfNeighbors++;
		grid[row][column - 1] === 1 && numberOfNeighbors++;
		grid[row][column + 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column - 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column] === 1 && numberOfNeighbors++;
		grid[row + 1][column + 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}
}
