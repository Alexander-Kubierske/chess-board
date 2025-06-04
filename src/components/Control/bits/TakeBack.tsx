import { useAppContext } from "../../../contexts/Contexts";
import { takeBack } from "../../../reducer/actions/movePiece";

const TakeBack = () => {
  const { dispatch } = useAppContext();
  return (
    <div>
      <button onClick={() => dispatch(takeBack())}>Take Back</button>
    </div>
  );
};

export default TakeBack;
