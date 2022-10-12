import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Key } from "../../enums/Key";
import { focusElement } from "../../helpers/focusElement";
import { Position } from "../../interfaces/Position";
import { Grid as IGrid } from "../../types/Grid";
import Cell from "../Cell";

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

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			const focusedElement = document.activeElement;

			if (focusedElement?.id.includes("cell")) {
				const row = focusedElement?.id.split("-")[1];
				const column = focusedElement?.id.split("-")[2];

				switch (e.key) {
					case Key.ArrowUp:
						focusElement(`#cell-${+row - 1}-${column}`);
						break;
					case Key.ArrowDown:
						focusElement(`#cell-${+row + 1}-${column}`);
						break;
					case Key.ArrowLeft:
						focusElement(`#cell-${row}-${+column - 1}`);
						break;
					case Key.ArrowRight:
						focusElement(`#cell-${row}-${+column + 1}`);
						break;
					default:
						break;
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Container ref={gridContainerRef}>
			<GridElement ref={gridRef} numberOfRows={numberOfRows}>
				{grid &&
					grid.map((rows, i) =>
						rows.map((col, j) => (
							<Cell
								id={`cell-${i}-${j}`}
								className={col === 0 ? "dead" : "alive"}
								key={`${i}-${j}`}
								row={i}
								column={j}
								toggleCell={toggleCell}
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
	width: 1050px;
	max-width: calc(100% - 32px);
	margin-bottom: 16px;

	&.animate {
		animation: ${borderAnimation} 1750ms ease-in-out infinite;
	}

	@media (min-width: 1800px) {
		width: 1300px;
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
	overflow: hidden;

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

export default Grid;
