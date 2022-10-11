import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGameBoard from "../../hooks/useGameBoard";
import Grid from "../Grid";
import Button from "../Button";

function GameBoard() {
	const [numberOfRows, setNumberOfRows] = useState(16);
	const [isRunning, setIsRunning] = useState(false);
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
			}, 500);
			return () => {
				clearInterval(interval);
			};
		}
	}, [isRunning, calculateNextFrame]);

	return (
		<Container>
			<WelcomeText>Welcome to the game of life.</WelcomeText>
			<Introduction>
				Click the explanation button to learn the rules and have fun playing!
			</Introduction>
			<Grid
				numberOfRows={numberOfRows}
				isRunning={isRunning}
				grid={grid}
				toggleCell={toggleCell}
			/>
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
					min={8}
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
