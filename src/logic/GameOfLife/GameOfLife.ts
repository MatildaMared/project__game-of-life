import { Position } from "../../interfaces/Position";

export class GameOfLife {
	grid: number[][];

	constructor(numberOfRows: number) {
		this.grid = this.createInitialGrid(numberOfRows);
	}

	createInitialGrid(numberOfRows: number) {
		const grid = [];

		for (let i = 0; i < numberOfRows; i++) {
			grid.push(Array.from(Array(numberOfRows * 2), () => 0));
		}
		console.log(grid);
		return grid;
	}

	toggleCell(position: Position) {
		const { row, column } = position;
		console.log("Will update cell");
		this.grid[row][column] = this.grid[row][column] === 0 ? 0 : 1;
	}
}
