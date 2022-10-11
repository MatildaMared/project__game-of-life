import React from "react";
import styled from "styled-components";
import Button from "../Button";

function Header() {
	return (
		<Container>
			<Heading>Welcome to the Game of Life. 🌱</Heading>
			<Instructions>
				Place your cells using the mouse or keyboard and press the start button
				to start the simulation. Click the rules button to learn the rules. Have
				fun!
			</Instructions>
			<Button secondary onClick={() => 1}>
				Show rules
			</Button>
		</Container>
	);
}

const Container = styled.header`
	width: 100%;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid var(--color-gray-800);

	& button {
		position: absolute;
		right: 32px;
	}
`;

const Heading = styled.h1`
	font-family: var(--font-secondary);
	font-size: 1.125rem;
`;

const Instructions = styled.p`
	font-size: 0.875rem;
	width: 75ch;
	color: var(--color-gray-200);
	text-align: center;
`;

export default Header;
