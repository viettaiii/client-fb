import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { FaFont } from "react-icons/fa";
import { GoTextSize } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

// -my imports
import "./create.scss";
import { routesPublic } from "../../../config/routes";
import HeaderRight from "../../Header/HeaderRight";
import { useContext } from "react";
import { UserContext } from "../../../context/authContext";
import Button from "../../Button";
import httpsRequest from "../../../api/axios";
import { addStory } from "../../../redux/actions/story";
import Spinner from "../../Modal/Spinner";
import LoadingSkeleton from "../../LoadingSkeleton";
import Avatar from "../../Avatar";
let isFirstLoading = true;
function Create() {
  const { currentUser } = useContext(UserContext);
  const [skeleton, setSkeleton] = useState(true);
  const [addDesc, setAddDesc] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [file, setFile] = useState(null);
  const imageRef = useRef();
  const descRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
      isFirstLoading = false;
    }, 4 * 1000);
  }, []);
  const handleCancle = () => {
    setAddDesc(false);
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

  const handleSubmit = async () => {
    if (!file) return;
    let desc = "";
    if (addDesc) {
      desc = descRef.current.innerText.trim();
    }
    setShowSpinner(true);
    const video = await handleFile(file);
    setTimeout(async () => {
      await dispatch(addStory({ desc, video }));
      setFile(null);
      setAddDesc("");
      navigate(routesPublic.home);
    }, 2 * 1000);
  };
  return (
    <div className="stories-create">
      <div className="stories-create__left">
        <div className="stories-create__left__header">
          <Link
            to={routesPublic.home}
            className="stories-create__left__header__close"
          >
            {isFirstLoading && skeleton ? (
              <LoadingSkeleton circle="true" />
            ) : (
              <AiOutlineClose />
            )}
          </Link>
          <Link
            to={routesPublic.home}
            className="stories-create__left__header__img"
          >
            {" "}
            {isFirstLoading && skeleton ? (
              <LoadingSkeleton circle="true" />
            ) : (
              <img src="/logo.png" alt="" />
            )}
          </Link>
        </div>
        <div className="stories-create__left__setting">
          <div className="stories-create__left__setting__title">
            {isFirstLoading && skeleton ? (
              <LoadingSkeleton width={"80%"} />
            ) : (
              <h5>Tin của bạn</h5>
            )}

            <span
              className="stories-create__left__setting__title__icon"
              onClick={() => alert("Chưa làm chức năng này!")}
            >
              {isFirstLoading && skeleton ? (
                <LoadingSkeleton circle={"true"} />
              ) : (
                <AiFillSetting />
              )}
            </span>
          </div>

          <Link
            to={routesPublic.profile + "/" + currentUser.id}
            className="stories-create__left__setting__user"
          >
           {isFirstLoading && skeleton ? <LoadingSkeleton  count={2}/>: <> <Avatar image={currentUser.profilePic} alt={currentUser.fistName} />
            <span>{currentUser.firstName + " " + currentUser.lastName}</span></>}
           
          </Link>
        </div>
        {file && (
          <div
            className="stories-create__left__add-text"
            onClick={() => setAddDesc(!addDesc)}
          >
            <span>
              <GoTextSize />
            </span>
            <h4>Thêm văn bản</h4>
          </div>
        )}
        {file && (
          <div className="stories-create__left__btns">
            <div className="btns">
              <Button btnReject text={"Bỏ"} onClick={handleCancle} />
              <Button
                btnConfirm
                text={"Chia sẻ lên tin"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
      <div className="stories-create__right">
      {isFirstLoading && skeleton ? <LoadingSkeleton/>: 
      <>
      {file ? (
          <div className="stories-create__right__box">
            <p className="stories-create__right__box__title">Xem trước</p>
            <div className="stories-create__right__box__background">
              <span className="stories-create__right__box__background__image">
                {file.name.endsWith(".mov") ||
                file.name.endsWith(".mp3") ||
                file.name.endsWith(".mp4") ? (
                  <video
                    ref={imageRef}
                    src={URL.createObjectURL(file)}
                    alt=""
                  ></video>
                ) : (
                  <img ref={imageRef} src={URL.createObjectURL(file)} alt="" />
                )}
                {addDesc && (
                  <div>
                    <blockquote className="stories-create__right__box__background__image__desc">
                      <p
                        data-placeholder="Bắt đầu nhập..."
                        contenteditable="true"
                        ref={descRef}
                      ></p>
                    </blockquote>
                  </div>
                )}
              </span>
            </div>
          </div>
        ) : (
          <>
            <label
              htmlFor="stories-create-file"
              className="stories-create__right__create stories-create__right__create--image"
            >
              <p>
                <BsImageFill />
              </p>
              <span>Tạo tin ảnh</span>
            </label>

            <input
              type="file"
              id="stories-create-file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="stories-create__right__create stories-create__right__create--text">
              <>
                <p>
                  <FaFont />
                </p>
                <span>Tạo tin dạng văn bảng</span>
              </>
            </div>
          </>
        )}
      </>}

      </div>
      <div className="stories-create__right-header">
          <HeaderRight isHideMessage={true} />
        
      </div>
      <Link
        to={routesPublic.home}
        className="stories-create__back tablet-display"
      >
        <img src="/logo.png" alt="facebook" />
      </Link>
      {showSpinner && <Spinner />}
    </div>
  );
}

export default Create;
