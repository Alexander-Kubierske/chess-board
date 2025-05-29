import { Status } from "../../constant.tsx";
import React from "react";
import { useAppContext } from "../../contexts/Contexts.tsx";
import { closePopup } from "../../reducer/actions/popup.tsx";
import "./Popup.css";

const Popup = ({ children }: { children: React.ReactNode }) => {
  const { appState, dispatch } = useAppContext();

  if (appState.status === Status.ongoing) return null;

  const onClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className="popup">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { onClosePopup }),
      )}
    </div>
  );
};

export default Popup;
