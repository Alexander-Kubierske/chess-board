import { StatusType } from './../constant.tsx'
import actionTypes from '../reducer/actions/actionTypes.tsx';

/** A tuple representing the coordinates of a square which is a valid chess move */
export type Move = [number, number];

/**
 * The positions each chess piece occupies. 
 * This represents a 3D array with each rank(row) being an array with a file (column) representing the
 * element for a chess cell wrapped in a third array which tracks past game piece layouts.
 * Pieces are represented as strings and empty spaces as empty strings.
 * 
 *  @type {string[][][]}
 */
export type Position = string[][][];

/**
 * Represents the full state of a chess game.
 *
 * @interface GameState
 * @property {Position[]} position - The list of all board positions throughout the game, including the current one.
 * @property {'w' | 'b'} turn - The current player's turn. 'w' for White, 'b' for Black.
 * @property {Move[]} movesList - A list of all moves played in the game.
 * @property {Move[]} availableMoves - All legal moves available for the current player.
 * @property {StatusType} status - The current status of the game (e.g., ongoing, checkmate, draw).
 * @property {string | null} promotionSquare - The square (e.g., "e8") where a pawn is being promoted, or null if none.
 * @property {Record<'w' | 'b', 'both' | 'left' | 'none'>} castleDirection - The castling rights remaining for each color.
 */
export interface GameState {
  position: Position[];
  turn: 'w' | 'b';
  movesList: string[];
  availableMoves: Move[];
  status: StatusType;
  promotionSquare: string | null;
  castleDirection: Record<'w' | 'b', 'both' | 'king' | 'queen' | 'none'>;
}

export interface NewMoveParams {
  newPosition: Position;
  newMove: string;
}

export type Action =
  | { type: typeof actionTypes.NEW_MOVE; payload: NewMoveParams }
  | { type: typeof actionTypes.CLEAR_AVAILABLE_MOVES }
  | { type: typeof actionTypes.TAKE_BACK }
  | { type: typeof actionTypes.GENERATE_AVAILABLE_MOVES; payload: { availableMoves: Move[] } }
  | { type: typeof actionTypes.PROMOTION_OPEN; payload: { rank: number; file: number; x: number; y: number } }
  | { type: typeof actionTypes.PROMOTION_CLOSE }
  | { type: typeof actionTypes.STALEMATE }
  | { type: typeof actionTypes.WIN; payload: 'w' | 'b' }
  | { type: typeof actionTypes.INSUFFICIENT_MATERIAL }
  | { type: typeof actionTypes.NEW_GAME; payload: GameState }
  | { type: typeof actionTypes.CAN_CASTLE; payload: 'none' | 'left' | 'both' };

/**
 * Represents the global context state and dispatch function used in the App provider.
 *
 * @typedef {object} ProviderState
 * @property {GameState} appState - The current state of the chess game.
 * @property {React.Dispatch<Action>} dispatch - The dispatch function for sending actions to the reducer.
 */
export type ProviderState = {
  appState: GameState;
  dispatch: React.Dispatch<Action>;
};