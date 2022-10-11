export function simulationSpeedInMilliseconds(speed: number) {
	switch (speed) {
		case 10:
			return 250;
		case 9:
			return 500;
		case 8:
			return 750;
		case 7:
			return 1000;
		case 6:
			return 1250;
		case 5:
			return 1500;
		case 4:
			return 1750;
		case 3:
			return 2000;
		case 2:
			return 2250;
		case 1:
			return 2000;
		default:
			return 1000;
	}
}
