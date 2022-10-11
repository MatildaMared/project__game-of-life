import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Button";

interface Props {
	toggleRules: () => void;
}

function Rules({ toggleRules }: Props) {
	useEffect(() => {
		function handleEscapeKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				toggleRules();
			}
		}

		window.addEventListener("keydown", handleEscapeKey);

		return () => {
			window.removeEventListener("keydown", handleEscapeKey);
		};
	}, [toggleRules]);

	return (
		<>
			<Overlay onClick={toggleRules} />
			<Container onClick={(e) => e.stopPropagation()}>
				<Button onClick={toggleRules}>Close</Button>
				<Heading>Rules</Heading>
				<RulesContainer>
					<RuleHeading>Living Cells 👶</RuleHeading>
					<RulesList>
						<Rule>Each cell with one or no neighbors dies of solitude.</Rule>
						<Rule>
							Each cell with four or more neighbors dies of overpopulation.
						</Rule>
						<li>Each cell with two or three neighbors survives.</li>
					</RulesList>
				</RulesContainer>
				<RulesContainer>
					<RuleHeading>Dead Cells 👻</RuleHeading>
					<RulesList>
						<Rule>Each cell with three neighbors comes alive.</Rule>
					</RulesList>
				</RulesContainer>
			</Container>
		</>
	);
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideInFromRight = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const Overlay = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.7);
	opacity: 0;
	animation: ${fadeIn} 1000ms ease-out forwards;
`;

const Container = styled.div`
	z-index: 2;
	background-color: var(--color-background);
	border-radius: 16px;
	padding: 32px;
	width: calc(100% - 32px);
	max-width: 600px;
	display: flex;
	flex-direction: column;
	gap: 32px;
	position: absolute;
	top: 20%;
	transform: translateX(100%);
	opacity: 0;
	animation: ${slideInFromRight} 500ms cubic-bezier(0.41, 0.34, 0.04, 1.26)
		forwards;
	animation-delay: 500ms;

	& button {
		position: absolute;
		right: 16px;
		top: 16px;
		opacity: 0;
		animation: ${fadeIn} 1000ms ease-out forwards;
		animation-delay: 750ms;
	}
`;

const Heading = styled.h1`
	font-family: var(--font-secondary);
	text-align: center;
	line-height: 1;
	opacity: 0;
	animation: ${fadeIn} 1000ms ease-out forwards;
	animation-delay: 1000ms;
`;

const RulesContainer = styled.div`
	border: 1px solid var(--color-gray-700);
	padding: 16px;
	border-radius: 4px;
	position: relative;
	opacity: 0;
	animation: ${fadeIn} 1000ms ease-out forwards;
	animation-delay: 1250ms;
`;

const RuleHeading = styled.h2`
	color: var(--color-pink);
	font-family: var(--font-secondary);
	font-size: 1.125rem;
	background-color: var(--color-background);
	padding: 0 6px;
	position: absolute;
	top: -14px;
`;

const RulesList = styled.ul`
	margin-top: 14px;
`;

const Rule = styled.li`
	&:not(:last-of-type) {
		margin-bottom: 16px;
	}
`;

export default Rules;
