import { getEmoji, Tile } from "./tile.ts";

class Playground {
  private grid: Tile[][] = [];
  private secrets: string[][] = [];
  public static length = 12;
  private static changes = 0;
  private static outSideChanges = 0;

  public constructor() {
    for (let i = 0; i < Playground.length; i++) {
      this.grid.push([]);
      this.secrets.push([]);
      for (let j = 0; j < Playground.length; j++) {
        this.grid[i].push(Tile.Black);
        this.secrets.push([]);
      }
    }
  }

  public toString() {
    let string = "";
    this.grid.forEach((row) => {
      row.forEach((x) => {
        string += getEmoji(x);
      });
      string += "\n";
    });

    return string;
  }

  public set(x: number, y: number, input: Tile) {
    this.grid[this.grid.length - y - 1][x] = input;
    Playground.changes += 1;
    Playground.outSideChanges += 1;
  }

  public get(x: number, y: number) {
    return this.grid[this.grid.length - y - 1][x];
  }

  public getSecret(x: number, y: number) {
    return this.secrets[this.grid.length - y - 1][x];
  }

  public setSecret(x: number, y: number, input: string) {
    this.secrets[this.grid.length - y - 1][x] = input;
    Playground.changes += 1;
  }

  public getChanges() {
	return Playground.changes;
  }

  public getOutsideChanges() {
	return Playground.outSideChanges;
  }

  public getInsideChanges() {
	return Playground.changes - Playground.outSideChanges;
  }
}

export default Playground;
