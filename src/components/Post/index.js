import { RiMoreLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
/// _my imports
import "./post.scss";
import Commnents from "../Comments";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
import { getComments } from "../../redux/actions/comment";
import { addLike, deleteLike, getLikes } from "../../redux/actions/like";
import { UserContext } from "../../context/authContext";
import { deletePost } from "../../redux/actions/post";
import LoadingSkeleton from "../LoadingSkeleton";
import Avatar from "../Avatar";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";
import { SocketContext } from "../../context/socketContext";
function Post({ post }) {
  const commentsRef = useRef();
  const skeleton = useFirstGoToPage();
  const { currentUser } = useContext(UserContext);
  const { sendLike } = useContext(SocketContext);
  const { isLoading, comments } = useSelector((state) => state.comments);
  const { likes } = useSelector((state) => state.likes);
  const [showCommnent, setShowComment] = useClickOutSide(commentsRef);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
    dispatch(getLikes());
  }, [dispatch, post]);

  const handleLike = async () => {
    if (
      likes.length > 0 &&
      likes.find(
        (like) => like.postId === post.id && like.userId === currentUser.id
      )
    ) {
      const values = { postId: post.id, userId: currentUser.id };
      await dispatch(deleteLike(values));
    } else {
      const values = {
        postId: post.id,
        senderId: currentUser.id,
        receiverId: post.userId,
      };
      await sendLike(values);
      // console.log({postId :post.id , senderId:currentUser.id , receiverId : post.userId})
      // await dispatch(addLike({ postId: post.id }));
    }
  };

  const handleDelete = async () => {
    await dispatch(deletePost(post.id));
  };
  return (
    <div className="post">
      <div className="post__header">
        <Link
          to={routesPublic.profile + "/" + post.userId}
          className="post__header__avatar"
        >
          {skeleton ? (
            <LoadingSkeleton circle="true" />
          ) : (
            <Avatar image={post.profilePic} alt={post.fistName} />
          )}
        </Link>
        <div className="post__header__info ">
          <>
            <span className="post__header__info__name">
              {skeleton ? (
                <LoadingSkeleton />
              ) : (
                <>{post.firstName + " " + post.lastName}</>
              )}
            </span>
            <>
              <span className="post__header__info__createdAt ">
                {skeleton ? (
                  <LoadingSkeleton />
                ) : (
                  <> {moment(post.createdAt).fromNow("mm")}</>
                )}
              </span>
            </>
          </>
        </div>

        <div className="post__header__options">
          <span className="post__header__options__icon">
            {skeleton ? (
              <LoadingSkeleton circle="true" />
            ) : (
              <>
                {" "}
                <RiMoreLine />
              </>
            )}
          </span>
          {post.userId === currentUser.id && (
            <span
              className="post__header__options__icon"
              onClick={handleDelete}
            >
              {skeleton ? (
                <LoadingSkeleton />
              ) : (
                <>
                  {" "}
                  <MdOutlineClose circle="true" />
                </>
              )}
            </span>
          )}
        </div>
      </div>
      <div className="post__body ">
        <p className="post__body__desc ">
          {skeleton ? <LoadingSkeleton /> : <>{post.desc}</>}
        </p>

        <span className="post__body__image">
          {skeleton ? (
            <LoadingSkeleton />
          ) : (
            <>
              {" "}
              {post.image.endsWith(".mov") || post.image.endsWith(".mp4") ? (
                <video
                  playsInline
                  controls
                  src={"/uploads/" + post.image}
                  alt={post.fistName}
                />
              ) : (
                <img src={"/uploads/" + post.image} alt={post.fistName} />
              )}
            </>
          )}
        </span>
      </div>
      <div className="post__bottom ">
        <div className="post__bottom__one" onClick={handleLike}>
          {skeleton ? (
            <LoadingSkeleton />
          ) : (
            <>
              {likes.find(
                (like) =>
                  like.postId === post.id && like.userId === currentUser.id
              ) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              {likes.filter((like) => like.postId === post.id).length} Thích
            </>
          )}
        </div>

        <div
          className="post__bottom__one "
          onClick={() => setShowComment(!showCommnent)}
        >
          {skeleton ? (
            <LoadingSkeleton />
          ) : (
            <>
              {" "}
              <GoComment />
              {comments.filter((com) => com.postId === post.id).length} Bình
              luận
            </>
          )}
        </div>

        <div className="post__bottom__one ">
          {skeleton ? (
            <LoadingSkeleton />
          ) : (
            <>
              {" "}
              <CiShare2 />
              12 Chia sẻ
            </>
          )}
        </div>
      </div>
      {isLoading
        ? "Loading..."
        : showCommnent && (
            <Commnents
              ref={commentsRef}
              postId={post.id}
              comments={comments}
              showCommnent={showCommnent}
            />
          )}
    </div>
  );
}

export default Post;
