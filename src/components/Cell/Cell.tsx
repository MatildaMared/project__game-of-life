import React from "react";
import styled from "styled-components";
import { Position } from "../../interfaces/Position";

interface Props {
	className: string;
	toggleCell: (position: Position) => void;
	row: number;
	column: number;
	id: string;
}

function Cell({ className, toggleCell, row, column, id }: Props) {

	return (
		<Container
			id={id}
			className={className}
			onClick={() => toggleCell({ row, column })}
		/>
	);
}

const Container = styled.button`
	width: 100%;
	aspect-ratio: 1/1;
	background-color: var(--color-gray-900);
	transition: background-color 250ms outline 250ms;
	cursor: pointer;
	border: none;
	border-radius: 2px;

	&:hover {
		background-color: var(--color-gray-800);
	}

	&.alive {
		background-color: var(--color-pink);
	}

	&:focus-visible,
	&:hover {
		outline: 2px solid var(--color-pink-light);
		outline-offset: -2px;
		border-radius: 1px;
	}
`;

export default Cell;
