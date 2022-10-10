export interface Rule {
	applies: (isAlive: boolean, numberOfNeighbors: number) => boolean;
	shouldLive: (numberOfNeighbors: number) => boolean;
}
