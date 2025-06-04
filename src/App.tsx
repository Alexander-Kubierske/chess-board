import { useReducer } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Contexts";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import TakeBack from "./components/Control/bits/TakeBack";
import MovesList from "./components/Control/bits/MovesList";
import Control from "./components/Control/Control";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <>
      <AppContext.Provider value={providerState}>
        <div className="App">
          <Board />
          <Control>
            <MovesList />
            <TakeBack />
          </Control>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
