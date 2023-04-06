import { useContext } from "react";

import { SocketContext } from "../../../context/socketContext";
import { useToast } from "../../../hooks/useToast";
import Toast from "./toast";

import "./toasts.scss";

function Toasts() {
  const {
    arrivalSuggestFriend,
    arrivalMess,
    arrivalConfrimFriend,
    arrivalLike,
  } = useContext(SocketContext);
  const { toasts, type } = useToast({
    arrivalSuggestFriend,
    arrivalMess,
    arrivalConfrimFriend,
    arrivalLike,
  });

  return (
    <div className="toasts">
      {toasts.map((toast, i) => (
        <Toast key={i} toast={toast} type={type} />
      ))}
    </div>
  );
}

export default Toasts;
