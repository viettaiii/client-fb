import { useContext, useEffect, useRef, useState } from "react";
import { getUserAxios } from "../../../api/method";
import { SocketContext } from "../../../context/socketContext";

import Toast from "./toast";
import "./toasts.scss";
function Toasts() {
  const { arrivalSuggestFriend } = useContext(SocketContext);
  const [toasts, setToast] = useState([]);
  const toastsRef = useRef();
  useEffect(() => {
    if (arrivalSuggestFriend) {
      const getUser = async (friendId) => {
        const data = await getUserAxios(friendId);
        setToast((prev) => [...prev, data]);
      };
      getUser(arrivalSuggestFriend.senderUserId);
      setTimeout(() => {
        setToast((prev) => prev.splice(1, prev.length - 1));
      }, 3000);
    }
  }, [arrivalSuggestFriend]);
  return (
    <div className="toasts" ref={toastsRef}>
      {toasts.map((toast, i) => (
        <Toast
          key={i}
          userId={toast.id}
          text={
            toast.firstName +
            " " +
            toast.lastName +
            " , đã gửi kết bạn cho bạn."
          }
          name={toast.firstName + " " + toast.lastName}
          createdAt={toast.createdAt}
          image={toast.profilePic}
        />
      ))}
    </div>
  );
}

export default Toasts;
