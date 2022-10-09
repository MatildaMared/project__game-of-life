import React from "react";
import styled from "styled-components";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";

function App() {
	return (
		<Container>
			<Header />
			<GameBoard />
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
