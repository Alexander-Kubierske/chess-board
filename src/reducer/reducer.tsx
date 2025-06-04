import { Action, GameState } from "../types/interfaces";
import { Status } from "../constant";
import actionTypes from "./actions/actionTypes";

/**
 *
 * This reducer function uses a switch board to update the game according to the dispatched action.
 *
 * @param {GameState} state - The current state of the game including piece positions and active turn.
 * @param {Action} action - The action dispatched to modify the game state.
 * @returns {GameState} The updated state of the game.
 *
 */

export const reducer = (state: GameState, action: Action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, movesList, position } = state;

      turn = turn === "w" ? "b" : "w";

      position = [...position, action.payload.newPosition];
      movesList = [...movesList, action.payload.newMove];
      return {
        ...state,
        movesList,
        turn,
        position,
      };
    }

    case actionTypes.GENERATE_AVAILABLE_MOVES: {
      return {
        ...state,
        availableMoves: action.payload.availableMoves,
      };
    }

    case actionTypes.TAKE_BACK: {
      let { position, movesList, turn } = state;

      if (position.length > 1) {
        position = position.slice(0, position.length - 1);
        movesList = movesList.slice(0, movesList.length - 1);
        turn = turn === "w" ? "b" : "w";
      }

      return {
        ...state,
        position,
        movesList,
        turn,
      };
    }

    case actionTypes.CLEAR_AVAILABLE_MOVES: {
      return {
        ...state,
        availableMoves: [],
      };
    }

    case actionTypes.PROMOTION_OPEN: {
      return {
        ...state,
        status: Status.promoting,
        promotionSquare: { ...action.payload },
      };
    }

    case actionTypes.PROMOTION_CLOSE: {
      return {
        ...state,
        status: Status.ongoing,
        promotionSquare: null,
      };
    }

    case actionTypes.CAN_CASTLE: {
      let { turn, castleDirection } = state;
      castleDirection[turn] = action.payload;

      return {
        ...state,
        castleDirection,
      };
    }

    case actionTypes.STALEMATE: {
      return {
        ...state,
        status: Status.stalemate,
      };
    }

    case actionTypes.WIN: {
      return {
        ...state,
        status: action.payload === "w" ? Status.white : Status.black,
      };
    }

    case actionTypes.INSUFFICIENT_MATERIAL: {
      return {
        ...state,
        status: Status.insufficient,
      };
    }

    case actionTypes.NEW_GAME: {
      return {
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
