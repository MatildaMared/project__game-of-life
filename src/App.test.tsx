import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("should display heading", () => {
	render(<App />);
});
