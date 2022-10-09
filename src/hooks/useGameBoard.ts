import React, { useState, useEffect } from "react";
import { Position } from "../interfaces/Position";

type Grid = number[][];

function useGameBoard(numberOfRows: number) {
	const [grid, setGrid] = useState<Grid>([]);

	function toggleCell(position: Position) {
		const { row, column } = position;
		const newGrid = [...grid];

		newGrid[row][column] = newGrid[row][column] === 0 ? 1 : 0;
		setGrid(newGrid);
	}

	function createInitialGrid(numberOfRows: number) {
		const grid = [];

		for (let i = 0; i < numberOfRows; i++) {
			grid.push(Array.from(Array(numberOfRows * 2), () => 0));
		}
		console.log(grid);
		return grid;
	}

	useEffect(() => {
		setGrid(createInitialGrid(numberOfRows));
	}, [numberOfRows]);

	return { grid, toggleCell };
}

export default useGameBoard;
