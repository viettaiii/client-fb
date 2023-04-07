import Post from "../Post";
import "./posts.scss";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post";
import SpinnerEllipsis from "../Modal/SpinnerEllipsis";
const Posts = memo(function Posts({ ownId }) {
  const { isLoading, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <>
      {isLoading ? (
        <SpinnerEllipsis/>
      ) : (
        <div className="posts">
          {ownId
            ? posts
                .filter((post) => post.userId === ownId)
                .map((post, index) => <Post post={post} key={index} />)
            : posts.map((post, index) => {
                return <Post post={post} key={index} />;
              })}
        </div>
      )}
    </>
  );
});

export default Posts;
