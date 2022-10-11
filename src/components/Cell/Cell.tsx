import React from "react";
import styled from "styled-components";
import { Position } from "../../interfaces/Position";

interface Props {
	className: string;
	toggleCell: (position: Position) => void;
	row: number;
	column: number;
}

function Cell({ className, toggleCell, row, column }: Props) {
	return (
		<Container
			className={className}
			onClick={() => toggleCell({ row, column })}
		/>
	);
}

const Container = styled.button`
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

export default Cell;
