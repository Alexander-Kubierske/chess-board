import { GameState, Position } from "./components/types/interfaces";
import { createPosition } from "./helper";

export const Status = {
  ongoing: "Ongoing",
  promoting: "Promoting",
  stalemate: "Game draws due to stalemate",
  insufficient: "Game draws die to insufficient material",
  white: "White wins",
  black: "Black wins",
};

export const initGameState: GameState = {
  position: [createPosition()], // Creates the initial position of the chessboard
  turn: "w", // White's turn to start the game
  availableMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
  castleDirection: {
    w: "both",
    b: "both",
  },
};

/**
 * The starting state of a regular chess game.
 * This object includes:
 * - The initial position of the chess pieces on the board, represented as a `Position` object, which is a 2D array of strings.
 *   The position is created using the `createPosition()` helper function, which sets up the chessboard with pieces in their starting positions.
 * - The current player's turn, which starts with 'w' for white's turn.
 *
 * @type {GameState}
 * @property {Position} position - The grid structure of the chess board (2D array)
 * @property {turn} turn - The current players turn.
 */
