import React, { useState, useEffect } from "react";
import { GameOfLife } from "../logic/GameOfLife/GameOfLife";

type GameBoard = null | GameOfLife;

function useGameBoard(numberOfRows: number) {
	const [gameBoard, setGameBoard] = useState<GameBoard>();

	useEffect(() => {
		setGameBoard(new GameOfLife(numberOfRows));
	}, [numberOfRows]);

	return { gameBoard };
}

export default useGameBoard;
