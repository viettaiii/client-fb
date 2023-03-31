import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
//-my imports


import { MdInsertEmoticon, MdLibraryAdd } from "react-icons/md";

import { useDispatch } from "react-redux";

// Myimports
import "./create-post.scss";
import CEmojiPicker from "../../CEmojiPicker";
import { AiOutlineClose } from "react-icons/ai";
import httpsRequest from "../../../api/axios";
import { addPost } from "../../../redux/actions/post";
import { UserContext } from "../../../context/authContext";
import LoadingSkeleton from "../../LoadingSkeleton";
import Avatar from "../../Avatar";
import { useClickOutSide } from "../../../hooks/useClickOutSide";
let isFirstLoading = true;
const CreatePost = forwardRef(({ setShowCreateShare, setShowSpinner }, ref) => {
  const emojiRef = useRef();
  const [showEmoji, setShowEmoji] = useClickOutSide(emojiRef);
  const { currentUser } = useContext(UserContext);
  const [skeleton, setSkeleton] = useState(true);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleEmoijClick = (event, emoij) => {
    setDesc((prev) => prev + event.emoji);
  };
  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  
  const handleClick = (e) => {
    setShowEmoji(!showEmoji);
  };
  const handleClose = (e) => {
    setFile(null);
  };
  const handleFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await httpsRequest.post("/api/upload", formData);
      return data.file;
    } catch (e) {
      console.log("Error", e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let image = "/no-background.png";
    if (file) {
      image = await handleFile(file);
    }
    setShowCreateShare(false);
    setShowSpinner(true);
    setTimeout(async () => {
      setShowSpinner(false);
      await dispatch(addPost({ image, desc }));
      setTimeout(() => {}, 300);
    }, 3 * 1000);
  };
  useEffect(() => {
    setTimeout(() => {
      isFirstLoading = false;
      setSkeleton(false);
    }, 3 * 1000);
  }, []);
  return (
    <div className="model-create">
      <div className="create-post" ref={ref}>
        <div className="create-post__header">
          {skeleton && isFirstLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <h3>Tạo bài viết</h3>
              <span
                className="create-post__header__close"
                onClick={() => setShowCreateShare(false)}
              >
                <AiOutlineClose />
              </span>
            </>
          )}
        </div>
        <div className="create-post__center">
          <div className="create-post__center__info">
            <span className="create-post__center__info__avatar">
              {skeleton && isFirstLoading ? (
                <LoadingSkeleton circle="true" />
              ) : (
                <Avatar image={     currentUser.profilePic} alt={currentUser.fistName}/>
              )}
            </span>
            <span className="create-post__center__info__name">
              {skeleton && isFirstLoading ? (
                <LoadingSkeleton count={1} height={20} width={100} />
              ) : (
                <>{currentUser.firstName + " " + currentUser.lastName}</>
              )}
            </span>
          </div>
          <div className="create-post__center__search">
            {skeleton && isFirstLoading ? (
              <LoadingSkeleton count={1} />
            ) : (
              <>
                <>
                  <input
                    value={desc}
                    autoFocus={true}
                    placeholder={`${currentUser.firstName} ơi,bạn đang nghĩ gì vậy`}
                    onChange={handleChange}
                  />
                  <span className="emoij">
                    <MdInsertEmoticon onClick={handleClick} />

                    {showEmoji && (
                      <CEmojiPicker
                        handleEmoijClick={handleEmoijClick}
                        ref={emojiRef}
                        handleClick={handleClick}
                      />
                    )}
                  </span>
                </>
              </>
            )}
          </div>
          <div className="create-post__center__upload">
            {skeleton && isFirstLoading ? (
              <LoadingSkeleton count={1} height={100} />
            ) : (
              <>
                {!file && (
                  <label
                    className="create-post__center__upload__wrap"
                    htmlFor="create-post-image"
                  >
                    <span className="create-post__center__upload__wrap__image">
                      <span className="create-post__center__upload__wrap__image__icon">
                        <MdLibraryAdd />
                      </span>
                      <p>Thêm ảnh/video</p>
                      <span>hoặc kéo và thả</span>
                    </span>
                  </label>
                )}
                {!file && (
                  <input
                    id="create-post-image"
                    hidden
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                )}
                <div
                  className="create-post__center__upload__close"
                  onClick={handleClose}
                >
                  <GrClose />
                </div>
                {file && (
                  <div className="create-post__center__upload__file-image">
                    {file.name.endsWith(".mov") ||
                    file.name.endsWith(".mp4") 
                     ? (
                      <video
                        playsInline
                        controls
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    ) : (
                      <img src={URL.createObjectURL(file)} alt="" />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={file || desc ? false : true}
          className={`create-post__submit ${file || desc ? "" : "disable"}`}
        >
          {skeleton && isFirstLoading ? (
            <LoadingSkeleton count={1} />
          ) : (
            <>Đăng</>
          )}
        </button>
      </div>
    </div>
  );
});

export default CreatePost;
