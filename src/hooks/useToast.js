import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAxios } from "../api/method";
import { routesPublic } from "../config/routes";
import { addNotification } from "../redux/actions/notification";
import { useSound } from "./useSound";
const type = {
  SUGGEST_FRIEND: "SUGGEST_FRIEND",
  ARRIVAL_MESS: "ARRIVAL_MESS",
  CONFIRM_FRIEND: "CONFIRM_FRIEND",
  LIKE: "LIKE",
};
export const useToast = ({
  arrivalSuggestFriend,
  arrivalMess,
  arrivalConfrimFriend,
  arrivalLike
}) => {
  const sound = useSound();
  const [toasts, setToasts] = useState([]);
  const dispatch = useDispatch();
  const getUser = async (friendId) => {
    const data = await getUserAxios(friendId);
    return data;
  };
  const updateToast = async (action, friendId) => {
    const data = await getUser(friendId);
    switch (action) {
      case type.SUGGEST_FRIEND:
        data.text = "đã gửi kết bạn cho bạn.";
        data.type = action;
        data.navigate = routesPublic.profile + "/" + arrivalSuggestFriend.senderId;
        break;
      case type.ARRIVAL_MESS:
        data.text = "đã gửi cho bạn 1 tin nhắn.";
        data.type = action;
        data.navigate = routesPublic.messenger + "/" + arrivalMess.conversationId;
        break;
      case type.CONFIRM_FRIEND:
        data.text = "đã chấp nhận lời mời kết bạn";
        data.type = action;
        data.navigate = routesPublic.profile + "/" + data.id;
        break;
      case type.LIKE:
        data.text = "đã thích bài đăng của bạn";
        data.type = action;
        data.navigate = routesPublic.profile + "/" + data.id;
        break;
      default:
        break;
    }
    return data;
  };
  const addNotificationFc = async (inputs) => {
        sound.play();
    await dispatch(addNotification(inputs));
  };
  useEffect(() => {
    if (arrivalSuggestFriend) {
      const senderId = arrivalSuggestFriend.senderId;
      const updateDate = async () => {
        const data = await updateToast(type.SUGGEST_FRIEND, senderId);
        data.createdAt = arrivalSuggestFriend.createdAt;
        setToasts((prev) => [...prev, data]);
        addNotificationFc({ text: data.text, senderId });
      };
      updateDate();
      setTimeout(() => {
        setToasts((prev) => [...prev.slice(1)]);
      }, 3000);
    }
  }, [arrivalSuggestFriend]);
  useEffect(() => {
    if (arrivalMess) {
      const senderId = arrivalMess.senderId;
      const updateDate = async () => {
        const data = await updateToast(type.ARRIVAL_MESS, senderId);
        data.createdAt = arrivalMess.createdAt;
        setToasts((prev) => [...prev, data]);
        addNotificationFc({ text: data.text, senderId });
      };
      updateDate();

      setTimeout(() => {
        setToasts((prev) => [...prev.slice(1)]);
      }, 3000);
    }
  }, [arrivalMess]);
  useEffect(() => {
    if (arrivalConfrimFriend) {
      const senderId = arrivalConfrimFriend.senderId;
      const updateDate = async () => {
        const data = await updateToast(type.CONFIRM_FRIEND, senderId);
        data.createdAt = arrivalConfrimFriend.createdAt;
        setToasts((prev) => [...prev, data]);
        addNotificationFc({ text: data.text, senderId });
      };
      updateDate();

      setTimeout(() => {
        setToasts((prev) => [...prev.slice(1)]);
      }, 3000);
    }
  }, [arrivalConfrimFriend]);
  useEffect(() => {
    if (arrivalLike) {
      const senderId = arrivalLike.senderId;
      const updateDate = async () => {
        const data = await updateToast(type.LIKE, senderId);
        data.createdAt = arrivalLike.createdAt;
        setToasts((prev) => [...prev, data]);
        addNotificationFc({ text: data.text, senderId });
      };
      updateDate();
      setTimeout(() => {
        setToasts((prev) => [...prev.slice(1)]);
      }, 3000);
    }
  }, [arrivalLike]);
  return { toasts, type };
};
