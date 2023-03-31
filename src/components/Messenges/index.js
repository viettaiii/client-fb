import { IoMdAddCircleOutline, IoMdImages } from "react-icons/io";
import { MdGif, MdOutlineInsertEmoticon } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";

//My imports
import Avatar from "../Avatar";
import "./messenges.scss";
import Messenge from "./Messenge";
import { UserContext } from "../../context/authContext";
import CEmojiPicker from "../CEmojiPicker";
import { addMessage } from "../../redux/actions/messenge";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { useSocket } from "../../hooks/useSocket";
import { useUserFriend } from "../../hooks/useUserFriend";
function Messenges({ currentMess, messenges }) {
  const emojiRef = useRef();
  const { currentUser } = useContext(UserContext);
  const user = useUserFriend(currentMess || null);
  const [mess, setMess] = useState("");
  const [showEmoji, setShowEmoji] = useClickOutSide(emojiRef);
  const [usersOn, handleSendMessage] = useSocket();
  const dispatch = useDispatch();
  const handleEmoijClick = (event, emoij) => {
    setMess((prev) => prev + event.emoji);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mess.trim()) {
      if (currentMess) {
        const values = {
          conversationId: currentMess.id,
          senderId: currentUser.id,
          text: mess,
          receiverId: user.id,
        };
        handleSendMessage(values);
        dispatch(addMessage(values));
        setMess("");
      }
    }
  };
  return (
    <div className="messenges">
      {user && (
        <div className="messenges__top">
          <div className="messenges__top__avatar">
            <Avatar image={user.profilePic} alt={user.firstName} />
            {usersOn.includes(user.id) && <span />}
          </div>
          <div className="messenges__top__info">
            <p className="messenges__top__info__name">
              {user.firstName + " " + user.lastName}
            </p>
            <span className="messenges__top__info__status">
              {usersOn.includes(user.id) ? (
                <small className="messenges__top__info__status__on">
                  Online
                </small>
              ) : (
                <small className="messenges__top__info__status__off">
                  Offline
                </small>
              )}
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
