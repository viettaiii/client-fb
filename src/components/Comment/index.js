import moment from "moment";
import PropTypes from "prop-types";
import { TfiClose } from "react-icons/tfi";
import { useContext, useRef } from "react";
import { useDispatch } from "react-redux";

// Myimports
import { deleteComment } from "../../redux/actions/comment";
import { UserContext } from "../../context/authContext";
import EditComment from "../Modal/EditComment";
import LoadingSkeleton from "../LoadingSkeleton";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";

function Comment({ comment, postId }) {
  const editRef = useRef();
  const skeleton = useFirstGoToPage();
  const [showEditComment, setShowEditComment] = useClickOutSide(editRef);
  const { currentUser } = useContext(UserContext);
  const dispatch = useDispatch();

  return (
    <>
      {postId !== comment.postId ? (
        ""
      ) : (
        <div>
          <div className="comments__comment">
            <span className="comments__comment__image">
              {skeleton ? (
                <LoadingSkeleton circle="true" />
              ) : (
                <img src={"/uploads/" + comment.profilePic} alt="" />
              )}
            </span>

            <div className="comments__comment__wrapper">
              <span className="comments__comment__info">
                <span className="comments__comment__info__name">
                  {skeleton ? (
                    <LoadingSkeleton />
                  ) : (
                    comment.firstName + " " + comment.lastName
                  )}
                </span>
                <p>
                  {skeleton ? <LoadingSkeleton width={100} /> : comment.desc}
                </p>
              </span>
              {comment.userId === currentUser.id && (
                <>
                  <div className="comments__comment__options">
                    <span
                      className="comments__comment__options__edit"
                      onClick={() => setShowEditComment(true)}
                    >
                      {skeleton ? <LoadingSkeleton /> : <>Chỉnh sửa</>}
                    </span>
                    <span
                      className="comments__comment__options__delete"
                      onClick={() => dispatch(deleteComment(comment.id))}
                    >
                      {skeleton ? <LoadingSkeleton /> : <TfiClose />}
                    </span>
                  </div>
                </>
              )}
            </div>

            <span className="comments__comment__createdAt">
              {skeleton ? (
                <LoadingSkeleton width={30} height={20} />
              ) : (
                moment(comment.createdAt).fromNow("mm")
              )}
            </span>
          </div>
          {showEditComment && (
            <EditComment
              ref={editRef}
              id={comment.id}
              setShowEditComment={setShowEditComment}
              desc={comment.desc}
            />
          )}
        </div>
      )}
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string || PropTypes.number,
};
export default Comment;
