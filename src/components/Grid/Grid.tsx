import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Position } from "../../interfaces/Position";
import { Grid as IGrid } from "../../types/Grid";

interface Props {
	isRunning: boolean;
	numberOfRows: number;
	grid: IGrid;
	toggleCell: (position: Position) => void;
}

function Grid({ isRunning, numberOfRows, grid, toggleCell }: Props) {
	const gridRef = React.useRef<HTMLDivElement>(null);
	const gridContainerRef = React.useRef<HTMLDivElement>(null);

	function startAnimation() {
		gridRef.current && gridRef.current.classList.add("animate");
		gridContainerRef.current &&
			gridContainerRef.current.classList.add("animate");
	}

	function stopAnimation() {
		gridRef.current && gridRef.current.classList.remove("animate");
		gridContainerRef.current &&
			gridContainerRef.current.classList.remove("animate");
	}

	useEffect(() => {
		if (isRunning) {
			startAnimation();
		} else {
			stopAnimation();
		}
	}, [isRunning]);

	return (
		<Container ref={gridContainerRef}>
			<GridElement ref={gridRef} numberOfRows={numberOfRows}>
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
			</GridElement>
		</Container>
	);
}

const flashAnimation = keyframes`
	  0% {
		transform: scale(1);
	  } 40% {
		  transform: scale(1.01);
		  filter: blur(8px);
	  } 70% {
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
	  } 40% {
		  border-color: var(--color-pink);
	  } 70% {
		  border-color: var(--color-pink);
	  } 100% {
		border-color: var(--color-gray-700);
	  }
`;

const Container = styled.div`
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

const GridElement = styled.div<GridProps>`
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

export default Grid;
