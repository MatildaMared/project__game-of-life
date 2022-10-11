import { Cell } from "../../enums/Cell";
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
			grid.push(Array.from(Array(numberOfRows * 2), () => Cell.Dead));
		}
		return grid;
	}

	toggleCell(grid: Grid, position: Position): Grid {
		const { row, column } = position;
		const newGrid = [...grid];

		const cell = newGrid[row][column];

		newGrid[row][column] = cell === Cell.Dead ? Cell.Alive : Cell.Dead;

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
		const newGrid = JSON.parse(JSON.stringify(currentGrid));

		for (let row = 0; row < currentGrid.length; row++) {
			for (let column = 0; column < currentGrid[row].length; column++) {
				const numberOfNeighbors = this.calculateNumberOfNeighbors(currentGrid, {
					row,
					column,
				});
				const isAlive = currentGrid[row][column] === Cell.Alive;
				const shouldLive = this.applyRules(numberOfNeighbors, isAlive);
				newGrid[row][column] = shouldLive ? Cell.Alive : Cell.Dead;
			}
		}

		return newGrid;
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

	private calculateNumberOfNeighborsForTopLeftCorner(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForTopRightCorner(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomLeftNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForBottomLeftCorner(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopRightNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForBottomRightCorner(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopLeftNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForTopEdge(grid: Grid, position: Position) {
		let numberOfNeighbors = 0;

		this.hasRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasLeftNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForBottomEdge(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasRightNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForLeftEdge(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasTopNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForRightEdge(
		grid: Grid,
		position: Position
	) {
		let numberOfNeighbors = 0;

		this.hasBottomNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private calculateNumberOfNeighborsForCenter(grid: Grid, position: Position) {
		let numberOfNeighbors = 0;

		this.hasTopNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomRightNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomNeighbor(grid, position) && numberOfNeighbors++;
		this.hasBottomLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasLeftNeighbor(grid, position) && numberOfNeighbors++;
		this.hasTopLeftNeighbor(grid, position) && numberOfNeighbors++;

		return numberOfNeighbors;
	}

	private hasTopLeftNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row - 1][column - 1] === Cell.Alive;
	}

	private hasTopNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row - 1][column] === Cell.Alive;
	}

	private hasTopRightNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row - 1][column + 1] === Cell.Alive;
	}

	private hasLeftNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row][column - 1] === Cell.Alive;
	}

	private hasRightNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row][column + 1] === Cell.Alive;
	}

	private hasBottomLeftNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row + 1][column - 1] === Cell.Alive;
	}

	private hasBottomNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row + 1][column] === Cell.Alive;
	}

	private hasBottomRightNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		return grid[row + 1][column + 1] === Cell.Alive;
	}
}
