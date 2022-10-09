import React, { useState } from "react";
import styled from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";
import { GameOfLife } from "../../logic/GameOfLife/GameOfLife";

function createInitialGrid(numberOfRows: number) {
	const grid = [];

	for (let i = 0; i < numberOfRows; i++) {
		grid.push(Array.from(Array(numberOfRows * 2), () => 0));
	}
	console.log(grid);
	return grid;
}

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(8);
	const { gameBoard } = useGameBoard(numberOfRows);

	return (
		<div>
			GameBoard
			<Grid numberOfRows={numberOfRows}>
				{gameBoard &&
					gameBoard.grid.map((rows, i) =>
						rows.map((col, j) => (
							<Cell
								className={col === 0 ? "dead" : "alive"}
								key={`${i}-${j}`}
								onClick={() => gameBoard.toggleCell({ row: i, column: col })}
							/>
						))
					)}
			</Grid>
		</div>
	);
}

interface GridProps {
	numberOfRows: number;
}

const Grid = styled.div<GridProps>`
	border: 3px solid var(--color-gray-700);
	background-color: var(--color-gray-700);
	display: grid;
	gap: 1px;
	grid-template-columns: repeat(${(props) => props.numberOfRows * 2}, 1fr);
`;

const Cell = styled.div`
	width: 25px;
	height: 25px;
	background-color: var(--color-gray-900);
	transition: background-color 250ms;
	cursor: pointer;

	&:hover {
		background-color: var(--color-gray-800);
	}
`;

export default GameBoard;
