import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";
import Button from "../Button";

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(20);
	const { grid, toggleCell, resetGame } = useGameBoard(numberOfRows);

	return (
		<Container>
			<WelcomeText>Welcome to the game of life.</WelcomeText>
			<Introduction>
				Click the explanation button to learn the rules and have fun playing!
			</Introduction>
			<GridWrapper>
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
			</GridWrapper>
			<ButtonContainer>
				<Button onClick={() => 1}>Start Game</Button>
				<Button secondary onClick={resetGame}>
					Reset Board
				</Button>
			</ButtonContainer>
			<RangeContainer>
				<RangeLabel htmlFor="grid-size">Grid Size</RangeLabel>
				<RangeInput
					name="grid-size"
					id="grid-size"
					type="range"
					value={numberOfRows}
					onChange={(e) => setNumberOfRows(+e.target.value)}
					min={16}
					max={32}
					step={4}
				/>
			</RangeContainer>
		</Container>
	);
}

const Container = styled.div`
	margin-top: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	max-width: 100%;
`;

interface GridProps {
	numberOfRows: number;
}

const GridWrapper = styled.div`
	border: 2px solid var(--color-gray-700);
	width: 1200px;
	max-width: calc(100% - 32px);
`;

const Grid = styled.div<GridProps>`
	background-color: var(--color-gray-700);
	display: grid;
	gap: 2px;
	grid-template-columns: repeat(${(props) => props.numberOfRows * 2}, 1fr);
	aspect-ratio: 2/1;
`;

const Cell = styled.button`
	width: 100%;
	aspect-ratio: 1/1;
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
		outline: 2px solid var(--color-pink-light);
		outline-offset: 2px;
		z-index: 1;
	}
`;

const WelcomeText = styled.h3`
	font-family: var(--font-secondary);
	text-align: center;
	margin-bottom: -8px;
`;

const Introduction = styled.p`
	text-align: center;
	width: 30ch;
	color: var(--color-gray-300);
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 16px;
`;

const RangeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
`;

const RangeInput = styled.input``;

const RangeLabel = styled.label`
	font-size: 0.875rem;
`;

export default GameBoard;
