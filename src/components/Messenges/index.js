import { io } from "socket.io-client";
import { IoMdAddCircleOutline, IoMdImages } from "react-icons/io";
import { MdGif, MdOutlineInsertEmoticon } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

//My imports
import Avatar from "../Avatar";
import "./messenges.scss";
import Messenge from "./Messenge";
import { UserContext } from "../../context/authContext";
import { getUserAxios } from "../../api/method";
import CEmojiPicker from "../CEmojiPicker";
import { addMessage, getMessages } from "../../redux/actions/messenge";
function Messenges({ messenges,currentMess , usersOn }) {
 
  const { currentUser  } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [mess, setMess] = useState("");
  const [arrivalMess, setArrivalMess] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef();
  const socket = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.current = io("ws://localhost:9111");
    socket.current.on("getMessage", (data) => {
      setArrivalMess({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        
      });
    });
  }, []);
  useEffect(() => {
    if (currentMess) {
      const { id, ...others } = currentMess;
      const friendId = Object.values(others).find(
        (userId) => userId !== currentUser.id
      );
      const getUser = async () => {
        const data = await getUserAxios(friendId);
        setUser(data);
      };
      getUser();
    }
  }, [currentMess]);
  const handleEmoijClick = (event, emoij) => {
    setMess((prev) => prev + event.emoji);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mess.trim()) {
      let message = null;
      if (currentMess) {
        message = {
          senderId: currentUser.id,
          text: mess,
          conversationId: currentMess.id,
        };
      }
      dispatch(addMessage(message));
      const { id, ...others } = currentMess;
      const friendId = Object.values(others).find(
        (userId) => userId !== currentUser.id
      );
      socket.current.emit("sendMessage", {
        senderId: currentUser.id,
        text: mess,
        receiverId: friendId,
      });
      
      setMess("");
    }
  };
  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    if (arrivalMess) {
      const { id, ...others } = currentMess;
      const currentChat = Object.values(others);
      if (currentChat.includes(arrivalMess.senderId)) {
         dispatch(getMessages(id));
        setArrivalMess(null);
      }
    }
  }, [arrivalMess, currentMess]);
  return (
    <div className="messenges">
      {user && (
        <div className="messenges__top">
          <div className="messenges__top__avatar">
            <Avatar image={user.profilePic} alt={user.firstName} />
          {usersOn.map(user => user.userId).includes(user.id) &&  <span />} 
          </div>
          <div className="messenges__top__info">
            <p className="messenges__top__info__name">
              {user.firstName + " " + user.lastName}
            </p>
            <span className="messenges__top__info__status">
            {usersOn.map(user => user.userId).includes(user.id) ? <small className="messenges__top__info__status__on">Online</small>:<small className="messenges__top__info__status__off">Offline</small>}
            </span>
          </div>
        </div>
      )}

      <div className="messenges__bottom">
        <div className="messenges__bottom__contents">
          {messenges.map((mess, i) => (
            <Messenge
              own={mess.senderId === currentUser.id}
              mess={mess}
              key={i}
            />
          ))}
        </div>
        <div className="messenges__bottom__box-mail">
          <div className="messenges__bottom__box-mail__left">
            <IoMdAddCircleOutline />
            <IoMdImages />
            <IoMdAddCircleOutline />
            <MdGif />
          </div>
          <form id="form-input-mess" action="POST">
            <div className="messenges__bottom__box-mail__content">
              <div className="messenges__bottom__box-mail__content__wrapper">
                <input
                  type="text"
                  placeholder="Aa"
                  value={mess}
                  onChange={(e) => setMess(e.target.value)}
                />
                {showEmoji ? (
                  <span className="emoij">
                    <CEmojiPicker
                      ref={emojiRef}
                      handleEmoijClick={handleEmoijClick}
                    />
                  </span>
                ) : (
                  <MdOutlineInsertEmoticon onClick={() => setShowEmoji(true)} />
                )}
              </div>
              <button
                type="submit"
                className="messenges__bottom__box-mail__content__submit"
                onClick={handleSubmit}
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messenges;
