import { GameState } from "./types/interfaces";
import { createPosition } from "./helper";

/**
 * Represents all possible states a chess game can be in and supplies the corresponding
 * message players receive as the game ends.
 *
 * @readonly
 * @enum {string}
 */
export const Status = {
  ongoing: "Ongoing", // status allowing players to move pieces as normal.
  promoting: "Promoting", // status and flag for triggering promotion popup logic
  stalemate: "Game draws due to stalemate", // flag and message for stalemate
  insufficient: "Game draws due to insufficient material", // flag and message for insufficient material draw
  white: "White wins", // flag and message for white wins
  black: "Black wins", // flag and message for black wins
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

export const initGameState: GameState = {
  position: [createPosition()],
  turn: "w",
  movesList: [],
  availableMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
  castleDirection: {
    w: "both",
    b: "both",
  },
};
