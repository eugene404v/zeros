import { ComposedPlayersType } from "../types/Players";

const defaultRow: Array<ComposedPlayersType> = new Array(10).fill(null);
export const defaultField: Array<Array<ComposedPlayersType>> = new Array(
  10
).fill(defaultRow);
