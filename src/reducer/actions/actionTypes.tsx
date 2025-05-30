/**
 * An object declaring all possible action types available to the player.
 * Each listed property in the object is an interaction point which is dispatched in the reducer
 * to modify the game state.
 *
 * @typedef {object} actionTypes
 * @property {string} NEW_MOVE - Action to make a new move. It will have a payload of the new board state.
 */
const actionTypes = {
  CAN_CASTLE: "CAN_CASTLE",
  CLEAR_AVAILABLE_MOVES: "CLEAR_AVAILABLE_MOVES",
  NEW_MOVE: "NEW_MOVE",
  NEW_GAME: "NEW_GAME",
  PROMOTION_OPEN: "PROMOTION_OPEN",
  PROMOTION_CLOSE: "PROMOTION_CLOSE",
  STALEMATE: "STALEMATE",
  WIN: "WIN",
  INSUFFICIENT_MATERIAL: "INSUFFICIENT_MATERIAL",
} as const;

export default actionTypes;
