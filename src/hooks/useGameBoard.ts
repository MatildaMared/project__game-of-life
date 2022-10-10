import { useState, useEffect } from "react";
import { Position } from "../interfaces/Position";
import { GameOfLife } from "../logic/GameOfLife/GameOfLife";

type Grid = number[][];

function useGameBoard(numberOfRows: number) {
	const [grid, setGrid] = useState<Grid>([]);
	const [gameOfLife] = useState(() => new GameOfLife());

	function toggleCell(position: Position) {
		const newGrid = gameOfLife.toggleCell(grid, position);
		setGrid(newGrid);
	}

	useEffect(() => {
		setGrid(gameOfLife.createInitialGrid(numberOfRows));
	}, [numberOfRows, gameOfLife]);

	return { grid, toggleCell };
}

export default useGameBoard;
