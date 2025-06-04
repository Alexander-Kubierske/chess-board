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
 * Represents the piece positions and current player turn
 * 
 * @interface GameState
 * @property {Position} position - The positions each chess piece occupies. As defined in the Position interface.
 * @property {'w' | 'b'} turn - The current players turn. Can be either white ('w') or black ('b').
 */
export interface GameState {
    position: Position;
    turn: 'w' | 'b';
    availableMoves
}

export interface NewMoveParams {
  newPosition: Position;
  newMove: string;
}

 interface Action {
    type:string;
    payload: {
        newPosition: string[][];
    };
}