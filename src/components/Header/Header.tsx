import React from "react";
import styled from "styled-components";

function Header() {
	return (
		<Container>
			<Heading>Game of Life 🌱</Heading>
		</Container>
	);
}

const Container = styled.header`
	padding: 16px;
	display: flex;
	justify-content: flex-end;
	background-color: rgba(255, 255, 255, 0.01);
	border-bottom: 1px solid var(--color-gray-800);
`;

const Heading = styled.h1`
	font-family: var(--font-secondary);
`;

export default Header;
