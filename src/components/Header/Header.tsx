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
	width: 100%;
	padding: 16px;
	display: flex;
	justify-content: flex-end;
	background-color: var(--color-gray-900);
	border-bottom: 1px solid var(--color-gray-800);
`;

const Heading = styled.h1`
	font-family: var(--font-secondary);
`;

export default Header;
