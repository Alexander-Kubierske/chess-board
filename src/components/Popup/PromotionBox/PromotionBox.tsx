import { useAppContext } from "../../../contexts/Contexts";
import { copyPosition } from "../../../helper";
import {
  clearAvailableMoves,
  makeNewMove,
} from "../../../reducer/actions/movePiece";
import "./PromotionBox.css";

const PromotionBox = ({ onClosePopup }) => {
  const options = ["q", "r", "b", "n"];

  const { appState, dispatch } = useAppContext();
  const { promotionSquare } = appState;

  if (!promotionSquare) return null;

  const colour = promotionSquare.x === 7 ? "w" : "b";

  const onClick = (option) => {
    onClosePopup();
    const newPosition = copyPosition(
      appState.position[appState.position.length - 1],
    );

    newPosition[promotionSquare.rank][promotionSquare.file] = "";
    newPosition[promotionSquare.x][promotionSquare.y] = colour + option;

    dispatch(clearAvailableMoves());
    dispatch(makeNewMove({ newPosition }));
  };

  return (
    <div className="popup-inner promotion-choices">
      {options.map((option) => (
        <div
          key={option}
          className={`piece ${colour}${option}`}
          onClick={() => onClick(option)}
        ></div>
      ))}
    </div>
  );
};

export default PromotionBox;
