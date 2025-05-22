import { useState, useRef } from "react";
import "./Pieces.scss";
import PlayingPiece from "./PlayingPiece";
import { useAppContext } from "../../contexts/Contexts";
import arbiter from "../../arbiter/arbiter";
import {
  clearAvailableMoves,
  makeNewMove,
} from "../../reducer/actions/movePiece";
import { openPromotion } from "../../reducer/actions/popup";
import { getCastleDirections } from "../../arbiter/getmoves";
import { updateCastling } from "../../reducer/actions/game";

interface Coordinates {
  x: number;
  y: number;
}

const Pieces = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { appState, dispatch } = useAppContext();

  const currentPosition = appState.position[appState.position.length - 1];

  /**
   * Calculates board coordinates based on mouse event position.
   * @param event - Mouse event from drag/drop
   * @returns Object containing x (rank) and y (file)
   */
  const calcCoords = (event: React.DragEvent<HTMLDivElement>): Coordinates => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((event.clientX - left) / size);
    const x = 7 - Math.floor((event.clientY - top) / size);
    return { x, y };
  };

  const updateCastlingState = ({ piece, rank, file }) => {
    const direction = getCastleDirections({
      castleDirection: appState.castleDirection,
      piece,
      rank,
      file,
    });

    if (direction) {
      console.log(direction + `n/ is direction none here?`);
      dispatch(updateCastling(direction));
    }
  };

  const openPromotionBox = ({ rank, file, x, y }) => {
    dispatch(openPromotion({ rank: Number(rank), file: Number(file), x, y }));
  };

  const move = (event: React.DragEvent<HTMLDivElement>) => {
    const { x, y } = calcCoords(event);

    const [piece, rank, file] = event.dataTransfer.getData("text").split(",");

    if (appState.availableMoves?.find((m) => m[0] === x && m[1] === y)) {
      if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
        openPromotionBox({ rank, file, x, y });
        return;
      }

      if (piece.endsWith("r") || piece.endsWith("k")) {
        updateCastlingState({ piece, rank, file });
      }

      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });

      dispatch(makeNewMove({ newPosition }));
    }

    dispatch(clearAvailableMoves());
  };

  /**
   * Handles the drop event for moving a piece on the chessboard and calls dispatch to update the state.
   *
   * @param {DragEvent} event - The drag event triggered when the user drops a piece.
   */
  const onDropFn = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    move(event);
  };

  const onDragOverFn = (event) => event.preventDefault();

  return (
    <div
      ref={ref}
      onDrop={onDropFn}
      onDragOver={onDragOverFn}
      className="pieces"
    >
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <PlayingPiece
              key={`${file}-${rank}`}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null,
        ),
      )}
    </div>
  );
};

export default Pieces;
