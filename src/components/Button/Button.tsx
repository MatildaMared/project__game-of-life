import React from "react";
import styled from "styled-components";

interface Props {
	children: React.ReactNode;
	secondary?: boolean;
	onClick: () => void;
}

function Button(props: Props) {
	const { children, secondary = false, onClick } = props;
	return (
		<Container secondary={secondary} onClick={onClick}>
			{children}
		</Container>
	);
}

interface ButtonProps {
	secondary?: boolean;
}

const Container = styled.button<ButtonProps>`
	border: ${(props) =>
		props.secondary
			? "2px solid var(--color-pink-dark)"
			: "2px solid transparent"};
	background-color: ${(props) =>
		props.secondary ? "var(--color-gray-800)" : "var(--color-pink-dark)"};
	color: #fff;
	font-family: var(--font-secondary);
	font-size: 14px;
	padding: 1px 8px 2px 8px;
	border-radius: 2px;
	cursor: pointer;
	position: relative;

	&::before {
		content: "";
		z-index: -1;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 2px;
		background-color: var(--color-pink-dark);
		opacity: 0.5;
		transition: transform 250ms, filter 250ms;
	}

	&:hover {
		background-color: ${(props) =>
			props.secondary ? "var(--color-gray-700)" : "var(--color-pink-dark)"};
		&::before {
			transform: scale(1.1);
			filter: blur(8px);
		}
	}

	&:focus {
		outline: 2px solid var(--color-pink);
		outline-offset: 4px;
	}
`;

export default Button;
