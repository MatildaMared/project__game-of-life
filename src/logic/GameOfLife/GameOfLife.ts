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

	private cellIsWithinGrid(grid: Grid, position: Position) {
		return (
			position.row >= 0 &&
			position.row < grid.length &&
			position.column >= 0 &&
			position.column < grid[position.row].length
		);
	}

	private calculateNumberOfNeighbors(grid: Grid, position: Position) {
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
		const topLeftNeighbor: Position = { row: row - 1, column: column - 1 };

		if (this.cellIsWithinGrid(grid, topLeftNeighbor)) {
			return grid[topLeftNeighbor.row][topLeftNeighbor.column] === Cell.Alive;
		}

		return false;
	}

	private hasTopNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const topNeighbor: Position = { row: row - 1, column: column };

		if (this.cellIsWithinGrid(grid, topNeighbor)) {
			return grid[topNeighbor.row][topNeighbor.column] === Cell.Alive;
		}

		return false;
	}

	private hasTopRightNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const topRightNeighbor: Position = { row: row - 1, column: column + 1 };

		if (this.cellIsWithinGrid(grid, topRightNeighbor)) {
			return grid[topRightNeighbor.row][topRightNeighbor.column] === Cell.Alive;
		}

		return false;
	}

	private hasLeftNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const leftNeighbor: Position = { row: row, column: column - 1 };

		if (this.cellIsWithinGrid(grid, leftNeighbor)) {
			return grid[leftNeighbor.row][leftNeighbor.column] === Cell.Alive;
		}

		return false;
	}

	private hasRightNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const rightNeighbor: Position = { row: row, column: column + 1 };

		if (this.cellIsWithinGrid(grid, rightNeighbor)) {
			return grid[rightNeighbor.row][rightNeighbor.column] === Cell.Alive;
		}

		return false;
	}

	private hasBottomLeftNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const bottomLeftNeighbor: Position = { row: row + 1, column: column - 1 };

		if (this.cellIsWithinGrid(grid, bottomLeftNeighbor)) {
			return (
				grid[bottomLeftNeighbor.row][bottomLeftNeighbor.column] === Cell.Alive
			);
		}

		return false;
	}

	private hasBottomNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const bottomNeighbor: Position = {
			row: row + 1,
			column: column,
		};

		if (this.cellIsWithinGrid(grid, bottomNeighbor)) {
			return grid[bottomNeighbor.row][bottomNeighbor.column] === Cell.Alive;
		}

		return false;
	}

	private hasBottomRightNeighbor(grid: Grid, position: Position) {
		const { row, column } = position;

		const bottomRightNeighbor: Position = {
			row: row + 1,
			column: column + 1,
		};

		if (this.cellIsWithinGrid(grid, bottomRightNeighbor)) {
			return (
				grid[bottomRightNeighbor.row][bottomRightNeighbor.column] === Cell.Alive
			);
		}

		return false;
	}
}
