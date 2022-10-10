import { useState, useEffect } from "react";
import { Position } from "../interfaces/Position";
import { GameOfLife } from "../logic/GameOfLife/GameOfLife";
import DeadCellWithThreeNeighbors from "../logic/rules/DeadCellWithThreeNeighbors";
import LivingCellWithFourOrMoreNeighbors from "../logic/rules/LivingCellWithFourOrMoreNeighbors";
import LivingCellWithOneOrLessNeighbors from "../logic/rules/LivingCellWithOneOrLessNeighbors";
import LivingCellWithTwoOrThreeNeighbors from "../logic/rules/LivingCellWithTwoOrThreeNeighbors";

type Grid = number[][];

function useGameBoard(numberOfRows: number) {
	const [grid, setGrid] = useState<Grid>([]);
	const [isRunning, setIsRunning] = useState(false);

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
		setIsRunning(false);
	}

	function toggleCell(position: Position) {
		const newGrid = gameOfLife.toggleCell(grid, position);
		setGrid(newGrid);
	}

	function toggleGame() {
		setIsRunning(() => !isRunning);
	}

	useEffect(() => {
		setGrid(gameOfLife.createInitialGrid(numberOfRows));
	}, [numberOfRows, gameOfLife]);

	useEffect(() => {
		if (isRunning) {
			const interval = setInterval(() => {
				setGrid(gameOfLife.calculateNextFrame(grid));
			}, 750);
			return () => clearInterval(interval);
		}
	}, [isRunning, grid, gameOfLife]);

	return { grid, toggleCell, resetGame, toggleGame, isRunning };
}

export default useGameBoard;
