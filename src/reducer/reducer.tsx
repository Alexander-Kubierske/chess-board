import { Action, GameState } from "../components/types/interfaces";
import { Status } from "../constant";
import actionTypes from "./actions/actionTypes"

/**
 * 
 * This reducer function uses a switch board to update the game according to the dispatched action.
 * 
 * @param {GameState} state - The current state of the game including piece positions and active turn.
 * @param {Action} action - The action dispatched to modify the game state.
 * @returns {GameState} The updated state of the game.
 * 
 */

export const reducer = (state: GameState, action:Action)=> {
    switch(action.type) {
        case actionTypes.NEW_MOVE : {
            let {turn,position} = state

            turn = turn === 'w' ? 'b' : 'w'

            position = [
                ...position,
                action.payload.newPosition
            ]
            return {
                ...state,
                turn,
                position
            }
        }

        case actionTypes.GENERATE_AVAILABLE_MOVES : {
            return {
                ...state,
                availableMoves : action.payload.availableMoves
            }
        }

        case actionTypes.CLEAR_AVAILABLE_MOVES : {
            return {
                ...state,
                availableMoves : []
            }
        }

        case actionTypes.PROMOTION_OPEN : {
            return {
                ...state,
                status : Status.promoting,
                promotionSquare : {...action.payload}
            }
        }

        case actionTypes.PROMOTION_CLOSE : {
            return {
                ...state,
                status : Status.ongoing,
                promotionSquare : null
            }
        }

        default :
            return state
    }
}