import React, { useState } from "react";
import styled from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(16);
	const { grid, toggleCell } = useGameBoard(numberOfRows);

	return (
		<div>
			GameBoard
			<Grid numberOfRows={numberOfRows}>
				{grid &&
					grid.map((rows, i) =>
						rows.map((col, j) => (
							<Cell
								className={col === 0 ? "dead" : "alive"}
								key={`${i}-${j}`}
								onClick={() => toggleCell({ row: i, column: j })}
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
	gap: 2px;
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

	&.alive {
		background-color: var(--color-pink);
	}
`;

export default GameBoard;
