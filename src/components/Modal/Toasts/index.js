import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAxios } from "../../../api/method";
import { SocketContext } from "../../../context/socketContext";
import { useSound } from "../../../hooks/useSound";
import { addNotification } from "../../../redux/actions/notification";
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
  const sound = useSound();
  const dispatch = useDispatch();
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
        const inputs = {
          text: data.text,
          senderId: senderId,
        };
        sound.play();
        const addNotificationFc = async () => {
          await dispatch(addNotification(inputs));
        }
        addNotificationFc();
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
      sound.once('load', function(){
        sound.play();
      });
    }

  }, [arrivalSuggestFriend, arrivalMess]);
  return (
    <div className="toasts" ref={toastsRef}>
      {toasts.map((toast, i) => (
        <Toast key={i} toast={toast} type={type} />
      ))}
    </div>
  );
}

export default Toasts;
