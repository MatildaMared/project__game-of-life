import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Rules from "../Rules";

function Header() {
	const [showRules, setShowRules] = useState(false);

	function toggleRules() {
		setShowRules(!showRules);
	}

	useEffect(() => {
		if (showRules) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = "visible";
		};
	}, [showRules]);

	return (
		<>
			<Container>
				<Heading>Welcome to the Game of Life. 🌱</Heading>
				<Instructions>
					Place your cells using the mouse or keyboard and press the start
					button to start the simulation. Click the rules button to learn the
					rules. Have fun!
				</Instructions>
				<Button secondary onClick={toggleRules}>
					Show rules
				</Button>
			</Container>
			{showRules && <Rules toggleRules={toggleRules} />}
		</>
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
		margin-top: 8px;
	}

	@media (min-width: 1000px) {
		& button {
			position: absolute;
			right: 32px;
		}
	}
`;

const Heading = styled.h1`
	margin-top: 8px;
	font-family: var(--font-secondary);
	font-size: 1.125rem;

	@media (min-width: 600px) {
		font-size: 1.375rem;
	}
`;

const Instructions = styled.p`
	font-size: 0.875rem;
	width: 75ch;
	max-width: 90%;
	color: var(--color-gray-200);
	text-align: center;
`;

export default Header;
