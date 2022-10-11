import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";
import Grid from "../Grid";
import Button from "../Button";
import { simulationSpeedInMilliseconds } from "../../helpers/simulationSpeedInMilliseconds";

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(16);
	const [isRunning, setIsRunning] = useState(false);
	const [simulationSpeed, setSimulationSpeed] = useState(7);
	const { grid, toggleCell, resetGame, calculateNextFrame } =
		useGameBoard(numberOfRows);

	function resetBoard() {
		setIsRunning(false);
		resetGame();
	}

	useEffect(() => {
		if (isRunning) {
			const interval = setInterval(() => {
				calculateNextFrame();
			}, simulationSpeedInMilliseconds(simulationSpeed));
			return () => {
				clearInterval(interval);
			};
		}
	}, [isRunning, calculateNextFrame, simulationSpeed]);

	return (
		<Container>
			<Grid
				numberOfRows={numberOfRows}
				isRunning={isRunning}
				grid={grid}
				toggleCell={toggleCell}
			/>
			<ButtonsContainer>
				<Button onClick={() => setIsRunning(!isRunning)}>
					{isRunning ? "Stop" : "Start"} Game
				</Button>
				<Button secondary onClick={resetBoard}>
					Reset Board
				</Button>
			</ButtonsContainer>
			<RangeInputsContainer>
				<RangeContainer>
					<RangeLabel htmlFor="board-size">Board Size</RangeLabel>
					<RangeInput
						name="board-size"
						id="board-size"
						type="range"
						value={numberOfRows}
						onChange={(e) => setNumberOfRows(+e.target.value)}
						min={8}
						max={28}
						step={4}
					/>
				</RangeContainer>
				<RangeContainer>
					<RangeLabel htmlFor="simulation-speed">Speed</RangeLabel>
					<RangeInput
						name="simulation-speed"
						id="simulation-speed"
						type="range"
						value={simulationSpeed}
						onChange={(e) => setSimulationSpeed(+e.target.value)}
						min={1}
						max={10}
						step={1}
					/>
				</RangeContainer>
			</RangeInputsContainer>
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

const ButtonsContainer = styled.div`
	display: flex;
	gap: 16px;
`;

const RangeInputsContainer = styled.div`
	border: 1px solid var(--color-gray-700);
	padding: 16px;
	border-radius: 4px;
	display: flex;
	gap: 16px;
	margin-top: 24px;
	position: relative;

	&::before {
		content: "Settings";
		font-family: var(--font-secondary);
		background-color: var(--color-background);
		color: var(--color-gray-100);
		padding: 8px;
		position: absolute;
		top: -22px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const RangeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
`;

const RangeInput = styled.input`
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
	width: 10rem;

	&::-moz-range-track {
		background: var(--color-gray-800);
		border-radius: 1rem;
		height: 0.5rem;
	}

	&::-webkit-slider-runnable-track {
		background: var(--color-gray-800);
		border-radius: 1rem;
		height: 0.5rem;
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: var(--color-pink-dark);
		border-radius: 50%;
		cursor: pointer;
		height: 1rem;
		width: 1rem;
		margin-top: -4px;
	}

	&::-moz-range-thumb {
		border: none;
		background: var(--color-pink-dark);
		border-radius: 50%;
		cursor: pointer;
		height: 1rem;
		width: 1rem;
		margin-top: -4px;
	}

	&:focus {
		outline: none;
	}

	&:focus::-webkit-slider-thumb {
		outline: 2px solid var(--color-pink-dark);
		outline-offset: 4px;
	}

	&:focus::-moz-range-thumb {
		outline: 2px solid var(--color-pink-dark);
		outline-offset: 4px;
	}
`;

const RangeLabel = styled.label`
	font-size: 0.875rem;
`;

export default GameBoard;
