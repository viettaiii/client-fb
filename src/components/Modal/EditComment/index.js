import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AiFillCloseCircle } from "react-icons/ai";
import { UserContext } from "../../../context/authContext";
import { useDispatch } from "react-redux";
import "./edit-comment.scss";
import { updateComment } from "../../../redux/actions/comment";
import Spinner from "../Spinner";
let isFirstLoading = true;
const EditComment = ({ desc, id, setShowEditComment }) => {
  const { currentUser } = useContext(UserContext);
  const [skeleton, setSkeleton] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [value, setValue] = useState(desc);
  const editRef = useRef();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     setSkeleton(false);
  //     isFirstLoading = false;
  //   }, 3 * 1000);
  // }, []);
  const handleUpdate = async () => {
    if (desc.trim() === value.trim()) return;
    setShowSpinner(true);
    setTimeout(async () => {
      await dispatch(updateComment(value, id));
      setShowSpinner(false);
      setShowEditComment(false);
    }, 2 * 1000);
  };
  useEffect(() => {
    function handleClickOutsideAccount(e) {
      if (editRef.current && !editRef.current.contains(e.target)) {
        setShowEditComment(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, [editRef]);
  return (
    <div className="edit-comment">
      <span ref={editRef}>
        <div className="edit-comment__wrap">
          <div className="edit-comment__wrap__avatar">
            <img src={"/uploads/" + currentUser.profilePic} alt="" />
          </div>
          <div className="edit-comment__wrap__info">
            <div className="edit-comment__wrap__info__name">
              {currentUser.firstName + " " + currentUser.lastName}
            </div>
            <div className="edit-comment__wrap__info__desc">
              <textarea
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="edit commment của bạn ?"
                autoFocus={true}
              />
            </div>
            <button onClick={handleUpdate}>Cập nhật</button>
          </div>
        </div>
        <div
          className="edit-comment__close"
          onClick={() => setShowEditComment(false)}
        >
          <AiFillCloseCircle />
        </div>
      </span>
      {showSpinner && <Spinner />}
    </div>
  );
};

EditComment.propTypes = {
  desc : PropTypes.string,
   id :PropTypes.string || PropTypes.number , 
   setShowEditComment : PropTypes.func
}
export default EditComment;
