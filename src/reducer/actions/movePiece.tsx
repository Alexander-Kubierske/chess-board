import actionTypes from "./actionTypes";
import { NewMoveParams, Move } from "../../types/interfaces";

/**
 * Creates an action to make a new move on the chessboard.
 * This action will be dispatched to the reducer to update the game state with the new position.
 *
 * @param {Object} params - The parameters object.
 * @param {Position} params.newPosition - The new position of the chess pieces, represented as a 2D array of strings (Position).
 * @param {newMove} string - Passes along the chess notation as a string upon making a move
 * @returns {Object} The action object containing the type and payload.
 */
export const makeNewMove = ({ newPosition, newMove }: NewMoveParams) => {
  return {
    type: actionTypes.NEW_MOVE,
    payload: { newPosition, newMove },
  };
};

export const generateAvailableMoves = ({
  availableMoves,
}: {
  availableMoves: Move[];
}) => {
  return {
    type: actionTypes.GENERATE_AVAILABLE_MOVES,
    payload: { availableMoves },
  };
};

export const clearAvailableMoves = () => {
  return {
    type: actionTypes.CLEAR_AVAILABLE_MOVES,
  };
};

export const takeBack = () => {
  return {
    type: actionTypes.TAKE_BACK,
  };
};
