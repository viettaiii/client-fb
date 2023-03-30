import moment from "moment";
import PropTypes from "prop-types";
import { TfiClose } from "react-icons/tfi";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";


// Myimports
import { deleteComment } from "../../redux/actions/comment";
import { UserContext } from "../../context/authContext";
import EditComment from "../Modal/EditComment";
import LoadingSkeleton from "../LoadingSkeleton";
let isFirstLoading = true;
function Comment({ comment, postId }) {
  const [skeleton, setSkeleton] = useState(true);
  const [showEditComment, setShowEditComment] = useState(false);
  const { currentUser } = useContext(UserContext);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
      isFirstLoading = false;
    }, 3 * 1000);
  }, []);

  return (
    <>
      {postId !== comment.postId ? (
        ""
      ) : (
        <div>
          <div className="comments__comment">
            <span className="comments__comment__image">
              {skeleton && isFirstLoading ? (
                <LoadingSkeleton circle="true" />
              ) : (
                <img src={"/uploads/" + comment.profilePic} alt="" />
              )}
            </span>

            <div className="comments__comment__wrapper">
              <span className="comments__comment__info">
                <span className="comments__comment__info__name">
                  {skeleton && isFirstLoading ? (
                    <LoadingSkeleton />
                  ) : (
                    comment.firstName + " " + comment.lastName
                  )}
                </span>
                  <p>
                {skeleton && isFirstLoading ? (
                  <LoadingSkeleton width={100} />
                ) : (
                  
                  comment.desc
                  
                  
                  
                )}
                  </p>
              </span>
              {comment.userId === currentUser.id && (
                <>
                  <div className="comments__comment__options">
                    <span
                      className="comments__comment__options__edit"
                      onClick={() => setShowEditComment(true)}
                    >
                      {skeleton && isFirstLoading ? (
                        <LoadingSkeleton />
                      ) : (
                        <>Chỉnh sửa</>
                      )}
                    </span>
                    <span
                      className="comments__comment__options__delete"
                      onClick={() => dispatch(deleteComment(comment.id))}
                    >
                      {skeleton && isFirstLoading ? (
                        <LoadingSkeleton />
                      ) : (
                        <TfiClose />
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>

            <span className="comments__comment__createdAt">
            {skeleton && isFirstLoading ? (
                        <LoadingSkeleton width={30} height={20}/>
                      ) : (
                        moment(comment.createdAt).fromNow("mm")
                      )}
            
            </span>
          </div>
          {showEditComment && (
            <EditComment
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
  comment : PropTypes.object,
   postId : PropTypes.string || PropTypes.number
}
export default Comment;
