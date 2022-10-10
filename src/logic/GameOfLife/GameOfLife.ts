import { Position } from "../../interfaces/Position";
import { Rule } from "../../interfaces/Rule";
import { Grid } from "../../types/Grid";

export class GameOfLife {
	rules: Rule[];

	constructor(rules: Rule[]) {
		this.rules = rules;
	}

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

	applyRules(numberOfNeighbors: number, isAlive: boolean): boolean {
		let shouldLive = false;

		for (const rule of this.rules) {
			if (rule.applies(isAlive, numberOfNeighbors)) {
				shouldLive = rule.shouldLive(numberOfNeighbors);
				break;
			}
		}

		return shouldLive;
	}

	calculateNextFrame(currentGrid: Grid): Grid {
		const newGrid = [...currentGrid];

		for (let row = 0; row < currentGrid.length; row++) {
			for (let column = 0; column < currentGrid[row].length; column++) {
				const numberOfNeighbors = this.calculateNumberOfNeighbors(currentGrid, {
					row,
					column,
				});
				const isAlive = currentGrid[row][column] === 1;
				const shouldLive = this.applyRules(numberOfNeighbors, isAlive);
				newGrid[row][column] = shouldLive ? 1 : 0;
			}
		}

		console.log(newGrid);

		return newGrid;
	}

	private calculateNumberOfNeighborsForTopLeftCorner(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row][column + 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column] === 1 && numberOfNeighbors++;
		grid[row + 1][column + 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForTopRightCorner(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row][column - 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column] === 1 && numberOfNeighbors++;
		grid[row + 1][column - 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForBottomLeftCorner(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row][column + 1] === 1 && numberOfNeighbors++;
		grid[row - 1][column] === 1 && numberOfNeighbors++;
		grid[row - 1][column + 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForBottomRightCorner(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row][column - 1] === 1 && numberOfNeighbors++;
		grid[row - 1][column] === 1 && numberOfNeighbors++;
		grid[row - 1][column - 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForTopEdge(grid: Grid, position: Position) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row][column - 1] === 1 && numberOfNeighbors++;
		grid[row][column + 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column - 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column] === 1 && numberOfNeighbors++;
		grid[row + 1][column + 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForBottomEdge(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row][column - 1] === 1 && numberOfNeighbors++;
		grid[row][column + 1] === 1 && numberOfNeighbors++;
		grid[row - 1][column - 1] === 1 && numberOfNeighbors++;
		grid[row - 1][column] === 1 && numberOfNeighbors++;
		grid[row - 1][column + 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForLeftEdge(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row - 1][column] === 1 && numberOfNeighbors++;
		grid[row - 1][column + 1] === 1 && numberOfNeighbors++;
		grid[row][column + 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column] === 1 && numberOfNeighbors++;
		grid[row + 1][column + 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForRightEdge(
		grid: Grid,
		position: Position
	) {
		const { row, column } = position;

		let numberOfNeighbors = 0;

		grid[row - 1][column] === 1 && numberOfNeighbors++;
		grid[row - 1][column - 1] === 1 && numberOfNeighbors++;
		grid[row][column - 1] === 1 && numberOfNeighbors++;
		grid[row + 1][column] === 1 && numberOfNeighbors++;
		grid[row + 1][column - 1] === 1 && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForCenter(grid: Grid, position: Position) {
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

	calculateNumberOfNeighbors(grid: Grid, position: Position): number {
		const { row, column } = position;
		let numberOfNeighbors = 0;

		switch (row) {
			case 0:
				switch (column) {
					case 0:
						numberOfNeighbors = this.calculateNumberOfNeighborsForTopLeftCorner(
							grid,
							position
						);
						break;
					case grid[row].length - 1:
						numberOfNeighbors =
							this.calculateNumberOfNeighborsForTopRightCorner(grid, position);
						break;
					default:
						numberOfNeighbors = this.calculateNumberOfNeighborsForTopEdge(
							grid,
							position
						);
						break;
				}
				break;
			case grid.length - 1:
				switch (column) {
					case 0:
						numberOfNeighbors =
							this.calculateNumberOfNeighborsForBottomLeftCorner(
								grid,
								position
							);
						break;
					case grid[row].length - 1:
						numberOfNeighbors =
							this.calculateNumberOfNeighborsForBottomRightCorner(
								grid,
								position
							);
						break;
					default:
						numberOfNeighbors = this.calculateNumberOfNeighborsForBottomEdge(
							grid,
							position
						);
						break;
				}
				break;
			default:
				switch (column) {
					case 0:
						numberOfNeighbors = this.calculateNumberOfNeighborsForLeftEdge(
							grid,
							position
						);
						break;
					case grid[row].length - 1:
						numberOfNeighbors = this.calculateNumberOfNeighborsForRightEdge(
							grid,
							position
						);
						break;
					default:
						numberOfNeighbors = this.calculateNumberOfNeighborsForCenter(
							grid,
							position
						);
						break;
				}
		}

		return numberOfNeighbors;
	}
}
