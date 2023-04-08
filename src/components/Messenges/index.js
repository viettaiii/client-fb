import { IoMdAddCircleOutline, IoMdImages } from "react-icons/io";
import { MdGif, MdOutlineInsertEmoticon } from "react-icons/md";
import { useContext, useRef, useState } from "react";


//My imports
import Avatar from "../Avatar";
import "./messenges.scss";
import Messenge from "./Messenge";
import { UserContext } from "../../context/authContext";
import CEmojiPicker from "../CEmojiPicker";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { useUserFriend } from "../../hooks/useUserFriend";
import { SocketContext } from "../../context/socketContext";
import SpinnerEllipsis from "../Modal/SpinnerEllipsis";
function Messenges({ messenges  , conversationId  }) {
  const emojiRef = useRef();
  const { currentUser } = useContext(UserContext);
  const user = useUserFriend(conversationId || null);
  const [mess, setMess] = useState("");
  const [showEmoji, setShowEmoji] = useClickOutSide(emojiRef);
  const { usersOn, sendMessage } = useContext(SocketContext);
  const handleEmoijClick = (event, emoij) => {
    setMess((prev) => prev + event.emoji);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mess.trim()) {
      if (conversationId) {
        const values = {
          conversationId : parseInt(conversationId),
          senderId: currentUser.id,
          text: mess,
          receiverId: user.id,
        };
        setMess("");
        sendMessage(values);
      }
    }
  };
  return (
    <div className="messenges">
      {!user  ? <SpinnerEllipsis/>: (
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
          {messenges.length <= 0 ? (
            <div
              style={{
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Hãy cùng trò chuyện với nhau nào.
            </div>
          ) : (
            messenges.map((mess, i) => (
              <Messenge
                own={mess.senderId === currentUser.id}
                mess={mess}
                key={i}
              />
            ))
          )}
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
