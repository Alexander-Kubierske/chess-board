import { Position, Piece, Rank, File, GameState, PrevPosition, XCoordinate, YCoordinate } from "../types/interfaces";

export interface GetRegularMovesInterface {
  position: Position;
  piece: Piece;
  rank: Rank;
  file: File;
}

export interface GetValidMovesInterface {
    position: Position,
    castleDirection: GameState["castleDirection"]
    prevPosition: PrevPosition,
    piece: Piece,
    rank: Rank,
    file: File,
}

export interface PerformMoveInterface {
    position: Position, 
    piece: Piece, 
    rank: Rank, 
    file: File, 
    x: XCoordinate, 
    y: YCoordinate 
}

export interface IsPlayerInCheckInterface {
    positionAfterMove: Position, 
    position: Position, 
    player: GameState["turn"]
}

export interface IsStalemateInterface { 
    position: Position, 
    player: GameState["turn"], 
    castleDirection: GameState["castleDirection"]
}

export interface IsCheckMate { 
    position: Position, 
    player: GameState["turn"], 
    castleDirection: GameState["castleDirection"]
}