import { areSameColourTiles, findPieceCoords } from "../helper";
import { Position } from "../types/interfaces";
import {
  GetRegularMovesInterface,
  GetValidMovesInterface,
  IsCheckMate,
  IsPlayerInCheckInterface,
  IsStalemateInterface,
  PerformMoveInterface,
} from "./arbiterInterfaces";
import {
  getRookMoves,
  getKnightMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
  getPawnMoves,
  getPawnCaptures,
  getCastlingMoves,
  getKingPosition,
  getPieces,
} from "./getMoves";
import { movePawn, movePiece } from "./move";

const arbiter = {
  /**
   * A helper function that identifies which piece is being moved and calls the corresponding function to handle
   * moving that piece.
   *
   * @param {GetRegularMovesInterface}
   */
  getRegularMoves: function ({
    position,
    piece,
    rank,
    file,
  }: GetRegularMovesInterface) {
    if (piece.endsWith("r")) return getRookMoves(position, piece, rank, file);
    if (piece.endsWith("n")) return getKnightMoves(position, rank, file);
    if (piece.endsWith("b")) return getBishopMoves(position, piece, rank, file);
    if (piece.endsWith("q")) return getQueenMoves(position, piece, rank, file);
    if (piece.endsWith("k")) return getKingMoves(position, piece, rank, file);
    if (piece.endsWith("p")) return getPawnMoves(position, piece, rank, file);
  },

  /**
   *A function that finds all possible legal chess moves in order to display to the
   *player which moves they can make. It returns either a 2D array with nested array coordinates or an empty array.
   *
   * @param {GetValidMovesInterface}
   * @returns {number[][]} - Either an array of tuples or and empty array.
   */
  getValidMoves: function ({
    position,
    castleDirection,
    prevPosition,
    piece,
    rank,
    file,
  }: GetValidMovesInterface) {
    let moves = this.getRegularMoves({ position, piece, rank, file }) ?? [];
    const notInCheckMoves: [number, number][] = [];

    if (piece.endsWith("p")) {
      moves = [
        ...moves,
        ...getPawnCaptures({ position, prevPosition, piece, rank, file }),
      ];
    }

    if (piece.endsWith("k")) {
      moves = [
        ...moves,
        ...getCastlingMoves(position, castleDirection, piece, rank, file),
      ];
    }

    moves?.forEach(([x, y]) => {
      const positionAfterMove = this.performMove({
        position,
        piece,
        rank,
        file,
        x,
        y,
      });

      if (
        !this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })
      ) {
        console.log(piece[0]);
        notInCheckMoves.push([x, y]);
      }
    });

    return notInCheckMoves;
  },

  /**
   *
   * @param {PerformMoveInterface}
   * @returns {}
   */
  performMove: function ({
    position,
    piece,
    rank,
    file,
    x,
    y,
  }: PerformMoveInterface) {
    if (piece.endsWith("p")) {
      return movePawn({ position, piece, rank, file, x, y });
    } else {
      return movePiece({ position, piece, rank, file, x, y });
    }
  },

  isPlayerInCheck: function ({
    positionAfterMove,
    position,
    player,
  }: IsPlayerInCheckInterface) {
    const enemy = player.startsWith("w") ? "b" : "w";

    let kingPosition = getKingPosition(positionAfterMove, player);
    const enemyPieces = getPieces(positionAfterMove, enemy);

    const enemyMoves = enemyPieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...(p.piece.endsWith("p")
            ? getPawnCaptures({
                position: positionAfterMove,
                prevPosition: position,
                ...p,
              })
            : this.getRegularMoves({
                position: positionAfterMove,
                ...p,
              })),
        ]),
      [],
    );

    if (
      enemyMoves.some(
        ([x, y]) => kingPosition[0] === x && kingPosition[1] === y,
      )
    ) {
      return true;
    }

    return false;
  },

  /**
   *
   * @param {IsStalemateInterface}
   * @returns {}
   */
  isStalemate: function ({
    position,
    player,
    castleDirection,
  }: IsStalemateInterface) {
    const isPlayerInCheck = this.isPlayerInCheck({
      positionAfterMove: position,
      player,
    });
    if (isPlayerInCheck) return false;

    const pieces = getPieces(position, player);
    const moves = pieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...this.getValidMoves({ position, castleDirection, ...p }),
        ]),
      [],
    );

    return !isPlayerInCheck && moves.length === 0;
  },

  insufficientMaterial: function (position: Position) {
    const pieces = position.reduce(
      (acc, rank) => (acc = [...acc, ...rank.filter((x) => x)]),
      [],
    );

    // Game state contains only 2 Kings
    if (pieces.length === 2) return true;

    // Game state contains only three pieces one of which is a Knight or a Bishop
    if (
      pieces.length === 3 &&
      pieces.some((p) => p.endsWith("b") || p.endsWith("n"))
    )
      return true;

    // Game state contains 4 pieces, 2 Bishops on the same colour
    if (
      pieces.length === 4 &&
      pieces.every(
        (remainingPieces) =>
          remainingPieces.endsWith("b") || remainingPieces.endsWith("k"),
      ) &&
      new Set(pieces).size === 4 &&
      areSameColourTiles(
        findPieceCoords(position, "wb")[0],
        findPieceCoords(position, "bb")[0],
      )
    )
      return true;

    return false;
  },

  isCheckMate: function ({ position, player, castleDirection }: IsCheckMate) {
    const isPlayerInCheck = this.isPlayerInCheck({
      positionAfterMove: position,
      player,
    });
    if (!isPlayerInCheck) return false;

    const pieces = getPieces(position, player);
    const moves = pieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...this.getValidMoves({ position, castleDirection, ...p }),
        ]),
      [],
    );

    return isPlayerInCheck && moves.length === 0;
  },
};

export default arbiter;
