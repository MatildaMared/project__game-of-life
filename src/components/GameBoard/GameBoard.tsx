import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";
import { Position } from "../../interfaces/Position";
import { GameOfLife } from "../../logic/GameOfLife/GameOfLife";
import DeadCellWithThreeNeighbors from "../../logic/rules/DeadCellWithThreeNeighbors";
import LivingCellWithFourOrMoreNeighbors from "../../logic/rules/LivingCellWithFourOrMoreNeighbors";
import LivingCellWithOneOrLessNeighbors from "../../logic/rules/LivingCellWithOneOrLessNeighbors";
import LivingCellWithTwoOrThreeNeighbors from "../../logic/rules/LivingCellWithTwoOrThreeNeighbors";
import { Grid as IGrid } from "../../types/Grid";
import Button from "../Button";

const gameOfLife = new GameOfLife([
	new DeadCellWithThreeNeighbors(),
	new LivingCellWithFourOrMoreNeighbors(),
	new LivingCellWithTwoOrThreeNeighbors(),
	new LivingCellWithOneOrLessNeighbors(),
]);

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(4);
	const [isRunning, setIsRunning] = useState(false);
	const [grid, setGrid] = useState<IGrid>([]);
	// const { grid, toggleCell, resetGame, calculateNextFrame } =
	// 	useGameBoard(numberOfRows);
	const gridRef = React.useRef<HTMLDivElement>(null);
	const gridWrapperRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		setGrid(gameOfLife.createInitialGrid(numberOfRows));
	}, [numberOfRows]);

	function toggleCell(position: Position) {
		const newGrid = gameOfLife.toggleCell(grid, position);
		setGrid(newGrid);
	}

	function resetBoard() {
		setIsRunning(false);
		// resetGame();
	}

	useEffect(() => {
		console.log("Grid was changed!");
	}, [grid]);

	useEffect(() => {
		if (isRunning) {
			console.log("This is what the grid looks like now: ", grid);
			const newGrid = gameOfLife.calculateNextFrame(grid);
			// console.log("This is what the new grid looks like", newGrid);
			// calculateNextFrame();
			// const interval = setInterval(() => {
			// 	gridRef.current && gridRef.current.classList.add("animate");
			// 	gridWrapperRef.current &&
			// 		gridWrapperRef.current.classList.add("animate");
			// 	calculateNextFrame(grid);
			// }, 1000);
			// return () => {
			// 	clearInterval(interval);
			// };
		}

		if (!isRunning) {
			gridRef.current && gridRef.current.classList.remove("animate");
			gridWrapperRef.current &&
				gridWrapperRef.current.classList.remove("animate");
		}
	}, [isRunning, grid]);

	return (
		<Container>
			<WelcomeText>Welcome to the game of life.</WelcomeText>
			<Introduction>
				Click the explanation button to learn the rules and have fun playing!
			</Introduction>
			<GridWrapper ref={gridWrapperRef}>
				<Grid ref={gridRef} numberOfRows={numberOfRows}>
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
				<Button onClick={() => setIsRunning(!isRunning)}>
					{isRunning ? "Stop" : "Start"} Game
				</Button>
				<Button secondary onClick={resetBoard}>
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
					min={4}
					max={32}
					step={4}
				/>
			</RangeContainer>
		</Container>
	);
}

const flashAnimation = keyframes`
	  0% {
		transform: scale(1);
	  } 50% {
		  transform: scale(1.01);
		  filter: blur(8px);
	  } 100% {
		transform: scale(1);
		filter: blur(0);
	  }
`;

const borderAnimation = keyframes`
		  0% {
		border-color: var(--color-gray-700);
	  } 50% {
		  border-color: var(--color-pink);
	  } 100% {
		border-color: var(--color-gray-700);
	  }
`;

const Container = styled.div`
	margin-top: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	max-width: 100%;
`;

const GridWrapper = styled.div`
	border: 3px solid var(--color-gray-700);
	width: 1200px;
	max-width: calc(100% - 32px);
	margin-bottom: 16px;

	&.animate {
		animation: ${borderAnimation} 1750ms ease-in-out infinite;
	}
`;

interface GridProps {
	numberOfRows: number;
}

const Grid = styled.div<GridProps>`
	background-color: var(--color-gray-700);
	display: grid;
	gap: 2px;
	grid-template-columns: repeat(${(props) => props.numberOfRows * 2}, 1fr);
	aspect-ratio: 2/1;
	position: relative;

	&.animate {
		&::before {
			animation: ${flashAnimation} 1750ms ease-in-out infinite;
		}
	}

	&::before {
		z-index: -1;
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--color-pink-dark);
		opacity: 0.5;
	}
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
