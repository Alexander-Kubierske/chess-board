import { useReducer } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Contexts";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import TakeBack from "./components/Control/bits/TakeBack";
import MovesList from "./components/Control/bits/MovesList";
import Control from "./components/Control/Control";
import { ProviderState } from "./types/interfaces";

/**
 * This is the Top-Level component that is responsible for providing game state and rendering the final game.
 *
 * @returns {JSX.Element} - The rendered app containing the 2 major pieces (the complete board and game controls)
 */
function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  /**
   * A store-like object used to provide the state of the app to lower level components.
   *
   * @typedef {Object} ProviderState
   * @property {AppState} appState - The current state of the application.
   * @property {React.Dispatch<Action>} dispatch - A function that dispatches updates to our state.
   */
  const providerState: ProviderState = {
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
