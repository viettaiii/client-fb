import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserAxios } from "../../../api/method";
import { SocketContext } from "../../../context/socketContext";
import Toast from "./toast";
import "./toasts.scss";
const type = {
  SUGGEST_FRIEND: "SUGGEST_FRIEND",
  ARRIVAL_MESS: "ARRIVAL_MESS",
};
function Toasts() {
  const { arrivalSuggestFriend, arrivalMess } = useContext(SocketContext);
  const [toasts, setToast] = useState([]);
  const toastsRef = useRef();
  useEffect(() => {
    if (arrivalSuggestFriend || arrivalMess) {
      const senderId = arrivalSuggestFriend
        ? arrivalSuggestFriend.senderUserId
        : arrivalMess.senderId;
      const getUser = async (friendId, action) => {
        const data = await getUserAxios(friendId);
        switch (action) {
          case type.SUGGEST_FRIEND:
            data.text = "đã gửi kết bạn cho bạn.";
            data.type = action;
            break;
          case type.ARRIVAL_MESS:
            data.text = "đã gửi cho bạn 1 tin nhắn.";
            data.type = action;
            break;
          default:
            break;
        }
        data.createdAt = arrivalSuggestFriend
          ? arrivalSuggestFriend.createdAt
          : arrivalMess.createdAt;
        setToast((prev) => [...prev, data]);
      };
      arrivalSuggestFriend
        ? getUser(senderId, type.SUGGEST_FRIEND)
        : getUser(senderId, type.ARRIVAL_MESS);
      setTimeout(() => {
        setToast((prev) => prev.slice(1, prev.length - 1));
      }, 3000);
    }
  }, [arrivalSuggestFriend, arrivalMess]);
  return (
    <div className="toasts" ref={toastsRef}>
      {toasts.map((toast, i) => (
        <Toast
          key={i}
          toast={toast}
          type={type}
        />
      ))}
    </div>
  );
}

export default Toasts;
