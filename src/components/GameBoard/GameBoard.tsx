import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(16);
	const { grid, toggleCell } = useGameBoard(numberOfRows);

	return (
		<Container>
			<WelcomeText>Welcome to the game of life.</WelcomeText>
			<Introduction>
				Click the explanation button to learn the rules and have fun playing!
			</Introduction>
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
		</Container>
	);
}

const Container = styled.div`
	margin-top: 32px;
`;

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

const Cell = styled.button`
	width: 25px;
	height: 25px;
	background-color: var(--color-gray-900);
	transition: background-color 250ms;
	cursor: pointer;
	border: none;

	&:hover {
		background-color: var(--color-gray-800);
	}

	&.alive {
		background-color: var(--color-pink);
	}

	&:focus {
		outline: 2px solid var(--color-pink-transparent);
		outline-offset: 2px;
		z-index: 1;
	}
`;

const WelcomeText = styled.h3`
	font-family: var(--font-secondary);
	margin: 0 auto;
	text-align: center;
	margin-bottom: 8px;
`;

const Introduction = styled.p`
	text-align: center;
	width: 30ch;
	margin: 0 auto;
	margin-bottom: 16px;
	color: var(--color-gray-300);
`;

export default GameBoard;
