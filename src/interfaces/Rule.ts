export interface Rule {
	applies: (isAlive: boolean) => boolean;
	shouldLive: (numberOfNeighbors: number) => boolean;
}
