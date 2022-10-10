import { useState, useEffect } from "react";
import { Position } from "../interfaces/Position";
import { GameOfLife } from "../logic/GameOfLife/GameOfLife";
import DeadCellWithThreeNeighbors from "../logic/rules/DeadCellWithThreeNeighbors";
import LivingCellWithFourOrMoreNeighbors from "../logic/rules/LivingCellWithFourOrMoreNeighbors";
import LivingCellWithOneOrLessNeighbors from "../logic/rules/LivingCellWithOneOrLessNeighbors";
import LivingCellWithTwoOrThreeNeighbors from "../logic/rules/LivingCellWithTwoOrThreeNeighbors";
import { Grid } from "../types/Grid";

function useGameBoard(numberOfRows: number) {
	const [grid, setGrid] = useState<Grid>([]);

	const [gameOfLife] = useState(
		() =>
			new GameOfLife([
				new DeadCellWithThreeNeighbors(),
				new LivingCellWithFourOrMoreNeighbors(),
				new LivingCellWithTwoOrThreeNeighbors(),
				new LivingCellWithOneOrLessNeighbors(),
			])
	);

	function resetGame() {
		setGrid(gameOfLife.createInitialGrid(numberOfRows));
	}

	function toggleCell(position: Position) {
		const newGrid = gameOfLife.toggleCell(grid, position);
		setGrid(newGrid);
	}

	function calculateNextFrame() {
		console.log("Calculating next frame");
		setGrid(() => gameOfLife.calculateNextFrame(grid));
		// const oldGrid = [...grid];
		// console.log("This is what the grid looks like now: ", oldGrid);
		// const newGrid = gameOfLife.calculateNextFrame([...grid]);
		// console.log("This is what the next frame looks like: ", newGrid);
		// const newGrid = gameOfLife.calculateNextFrame(grid);
		// setGrid(newGrid);
	}

	useEffect(() => {
		setGrid(gameOfLife.createInitialGrid(numberOfRows));
	}, [numberOfRows, gameOfLife]);

	return { grid, toggleCell, resetGame, calculateNextFrame };
}

export default useGameBoard;
