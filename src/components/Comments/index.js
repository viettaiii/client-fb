import { forwardRef, useContext, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";

import { MdInsertEmoticon } from "react-icons/md";
import CEmojiPicker from "../CEmojiPicker";
import "./commnents.scss";
import Comment from "../Comment";
import { UserContext } from "../../context/authContext";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/comment";
import Avatar from "../Avatar";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import LoadingSkeleton from "../LoadingSkeleton";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";

const Commnents = forwardRef(({ comments, postId }, ref) => {
  const skeleton = useFirstGoToPage();
  const emojiRef = useRef();
  const { currentUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [showEmoji, _,handleClick] = useClickOutSide(emojiRef);
  const handleEmoijClick = (event) => {
    setValue((prev) => prev + event.emoji);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSend = async () => {
    if (!value) return;
    await dispatch(addComment({ desc: value, postId: postId }));
    setValue("");
  };
  return (
    <div className="comments" ref={ref}>
      <div className="comments__other-users">
        {comments.map((comment, index) => (
          <Comment postId={postId} comment={comment} key={index} />
        ))}
      </div>

      <div className="comments__current-user">
        <>
          <span className="comments__current-user__image">
            {skeleton ? (
              <LoadingSkeleton circle="true" />
            ) : (
              <Avatar
                image={currentUser.profilePic}
                alt={currentUser.firstName}
              />
            )}
          </span>
          <span className="comments__current-user__input">
            {skeleton ? (
              <LoadingSkeleton height={50} />
            ) : (
              <input
                value={value}
                onChange={handleChange}
                onKeyDown={(e) => {
                  e.key === "Enter" && handleSend();
                }}
                type="text"
                placeholder={`${currentUser.firstName} bình luận...`}
              />
            )}

            {skeleton ? (
              <LoadingSkeleton />
            ) : (
              <span className="emoij">
                <MdInsertEmoticon onClick={handleClick} />
              </span>
            )}
            {showEmoji && (
              <CEmojiPicker
                handleEmoijClick={handleEmoijClick}
                ref={emojiRef}
                handleClick={handleClick}
              />
            )}
          </span>

          {skeleton ? (
            <LoadingSkeleton height={40} />
          ) : (
            <button
              className="comments__current-user__send"
              onClick={handleSend}
            >
              <BiSend />
            </button>
          )}
        </>
      </div>
    </div>
  );
});

export default Commnents;
