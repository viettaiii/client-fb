import { IoIosMore } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";
import { BsArrowLeft, BsBoxArrowInDownLeft } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { forwardRef, useEffect, useRef } from "react";
//-My imports
import "./chat.scss";
import { useState } from "react";
import { getConversations } from "../../redux/actions/conversation";
import Account from "../Account";
import MakeConversation from "../Modal/MakeConversation";
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
import { useClickOutSide } from "../../hooks/useClickOutSide";
const Chat = forwardRef(({ usersOn }, ref) => {
  const makeConversationRef = useRef();
  const [showIconSearch, setShowIconSearch] = useState(true);
  const [showMakeConversation, setShowMakeConversation] =
    useClickOutSide(makeConversationRef);
  const { conversations } = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, []);

  return (
    <div className="chat" ref={ref}>
      <div className="chat__header">
        <span>Chat</span>
        <div className="chat__header__icons">
          <span className="chat__header__icons__icon">
            <IoIosMore />
          </span>
          <span className="chat__header__icons__icon">
            <MdOutlineZoomOutMap />
          </span>
          <span className="chat__header__icons__icon">
            <HiVideoCamera />
          </span>
          <span className="chat__header__icons__icon">
            <BsBoxArrowInDownLeft />
          </span>
        </div>
      </div>
      <div className="chat__search">
        {!showIconSearch && (
          <div className="chat__search__back">
            <BsArrowLeft className="chat__search__back__icon" />
          </div>
        )}
        <div className="chat__search__wrap">
          {showIconSearch && (
            <AiOutlineSearch className="chat__search__wrap__icon" />
          )}

          <input
            type="text"
            placeholder="Tìm kiếm trên Messenger"
            onFocus={() => setShowIconSearch(false)}
            onBlur={() => setShowIconSearch(true)}
          />
        </div>
      </div>
      <div className="chat__options">
        <span className="chat__options__item select">Hộp thư</span>
        <span className="chat__options__item">Cộng đồng</span>
      </div>
      {/* <div className='chat__message-watting'>
                    <div className='chat__message-watting__left'>
                            <SiGooglemessages className='chat__message-watting__left__icon'/>
                    </div>
                    <div className='chat__message-watting__right'>
                            <span className='chat__message-watting__right__top'>Tin nhắn đang chờ mới</span>
                            <span className='chat__message-watting__right__bottom'>Từ Liều Kyn và 4 người khác</span>
                    </div>
                    <BsChevronCompactRight className='chat__message-watting__icon'/>
                    </div> */}
      <div className="chat__accounts">
        {conversations.length > 0 &&
          conversations.map((c, index) => (
            <Link to={routesPublic.messenger} key={index}>
              <Account conversation={c} />
            </Link>
          ))}
        <button
          className="chat__accounts__make-conversation"
          onClick={() => setShowMakeConversation(true)}
        >
          Tìm bạn trò chuyện
        </button>
      </div>
      {showMakeConversation && (
        <MakeConversation
          ref={makeConversationRef}
          usersOn={usersOn}
          showMakeConversation={showMakeConversation}
          setShowMakeConversation={setShowMakeConversation}
        />
      )}
    </div>
  );
});

export default Chat;
