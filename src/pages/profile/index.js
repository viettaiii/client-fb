import "./profile.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BsCameraFill } from "react-icons/bs";
import { CiImageOn, CiLocationOn, CiTrash, CiWifiOn } from "react-icons/ci";
import { IoIosMore, IoMdAdd } from "react-icons/io";
import { BiHome } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { FaCamera, FaUserFriends } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { UserContext } from "../../context/authContext";
import { routesPublic } from "../../config/routes";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUser } from "../../redux/actions/user";
import { getUserFriends } from "../../redux/actions/friend";
import { AiFillCamera, AiOutlineToTop } from "react-icons/ai";
import { RiAddBoxLine, RiMessengerFill } from "react-icons/ri";
import ImageUser from "../../components/Modal/ImageUser";
import Spinner from "../../components/Modal/Spinner";
import Button from "../../components/Button";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import UpdateAvatar from "../../components/Modal/UpdateAvatar";
import {
  getFriendsRequest,
  deleteFriendRequest,
} from "../../redux/actions/friendRequest";
import { TiShoppingBag } from "react-icons/ti";
import SpinnerEllipsis from "../../components/Modal/SpinnerEllipsis";
import { getStories } from "../../redux/actions/story";
import { getUserInfo } from "../../redux/actions/info";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";
import { useFileImage } from "../../hooks/useFileImage";
import Share from "../../components/Share";
import Posts from "../../components/Posts";
import { SocketContext } from "../../context/socketContext";
import {
  addConversation,
  getConversations,
} from "../../redux/actions/conversation";
import { StoreContext } from "../../context/storeContext";

const favories = ["Lái máy bay", "Bóng đá"];
function Profile() {
  const skeleton = useFirstGoToPage();
  const { sendSuggestFriend } = useContext(SocketContext);
  const params = useParams();
  const userId = parseInt(params.userId);
  const editCoverPicRef = useRef();
  const [showEditCoverPic, setShowEditCoverPic] =
    useClickOutSide(editCoverPicRef);
  const imageUserRef = useRef();
  const [showImageUser, setShowImageUser] = useClickOutSide(imageUserRef);
  const updateAvatarRef = useRef();
  const [showModalUpdateAvatar, setShowModalUpdateAvatar] =
    useClickOutSide(updateAvatarRef);
  const todosFavoriteRef = useRef();
  const [modalTodoFavorite, setModalTodoFavorite] =
    useClickOutSide(todosFavoriteRef);

  const dispatch = useDispatch();
  const handleFile = useFileImage();
  //-----
  const [showDescrip, setShowDescrip] = useState(false);
  const [valueDescrip, setValueDescrip] = useState("");
  const [userFavories, setUserFavories] = useState(favories);
  const {stories} = useContext(StoreContext);
  const [showSpinnerEllipsis, setShowSpinnerEllipsis] = useState(true);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const { friendsRequest } = useSelector((state) => state.friendsRequest);
  const { userInfo } = useSelector((state) => state.userInfo);
  const [coverPic, setCoverPic] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const { currentUser, update } = useContext(UserContext);
  const { userFriends } = useSelector((state) => state.userFriends);
  const { isLoading, userProfile } = useSelector((state) => state.userProfile);
  const { conversations } = useSelector((state) => state.conversations);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getStories());
    dispatch(getUserInfo(userId));
    dispatch(getConversations());
  }, [dispatch, userId]);
  useLayoutEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getUserFriends(userId));
    dispatch(getFriendsRequest());
  }, [userId, dispatch]);
  const handleCoverPic = (e) => {
    setShowSpinner(true);
    setTimeout(() => {
      setCoverPic(e.target.files[0]);
      setShowSpinner(false);
    }, 3 * 1000);
  };
  const handleSave = useCallback(async () => {
    const newCoverPic = await handleFile(coverPic);
    const { coverPic: coverPicOld, ...others } = userProfile;
    setShowSpinner(true);
    setCoverPic(null);
    setTimeout(async () => {
      await dispatch(updateUser({ ...others, coverPic: newCoverPic }));
      update({ ...others, coverPic: newCoverPic });
      setShowSpinner(false);
      setShowEditCoverPic(false);
    }, 3 * 1000);
  });
  const handleRemoveCoverPic = useCallback(() => {
    const { coverPic: coverPicOld, ...others } = userProfile;
    setShowModalRemove(false);
    setShowSpinner(true);
    setTimeout(async () => {
      await dispatch(updateUser({ ...others, coverPic: null }));
      update({ ...others, coverPic: null });
      setShowSpinner(false);
      setShowEditCoverPic(false);
    }, 3 * 1000);
  });

  const handleAddFriendRequest = async () => {
    sendSuggestFriend({ senderId: currentUser.id, receiverId: userId });
  };
  const handleDeleteRequest = async () => {
    const values = {
      senderId: currentUser.id,
      receiverId: userId,
    };
    await dispatch(deleteFriendRequest(values));
  };
  const handleToConversation = async () => {
    const conversation = conversations.find(
      (c) => c.userId_1 === userId || c.userId_2 === userId
    );
    if (conversation) {
      navigate(routesPublic.messenger + "/" + conversation.id);
    } else {
      await dispatch(addConversation(userId));
      navigate(
        routesPublic.messenger +
          "/" +
          (parseInt(conversations[conversations.length - 1].id) + 1)
      );
    }
  };
  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__top">
          <div className="profile__top__info">
            <div
              className="profile__top__info__cover-pic"
              style={{
                backgroundImage: coverPic
                  ? `url(${URL.createObjectURL(coverPic)})`
                  : `url(/uploads/${userProfile.coverPic})`,
              }}
            >
              {skeleton ? (
                <LoadingSkeleton />
              ) : (
                <>
                  {!coverPic && currentUser.id === parseInt(userId) && (
                    <button
                      className={`profile__top__info__cover-pic__edit ${
                        !userProfile.coverPic ? "no-cover" : ""
                      }`}
                      onClick={() => setShowEditCoverPic(true)}
                    >
                      {
                        <AiFillCamera
                          style={{ fontSize: "2rem" }}
                          className="screen-large-992-none tablet-display"
                        />
                      }
                      <span className="tablet-none">
                        <FaCamera /> Chỉnh sửa ảnh bìa
                      </span>
                      {showEditCoverPic && (
                        <div
                          className="profile__top__info__cover-pic__edit__modal"
                          ref={editCoverPicRef}
                        >
                          <span
                            className="profile__top__info__cover-pic__edit__modal__one"
                            onClick={() => {
                              setShowImageUser(true);
                            }}
                          >
                            <CiImageOn /> Chọn ảnh
                          </span>
                          <label
                            htmlFor="cover-pic__edit"
                            className="profile__top__info__cover-pic__edit__modal__one"
                          >
                            <AiOutlineToTop /> Tải lên
                          </label>
                          <input
                            type="file"
                            hidden
                            onChange={handleCoverPic}
                            id="cover-pic__edit"
                          />
                          <span
                            className="profile__top__info__cover-pic__edit__modal__one"
                            onClick={() => setShowModalRemove(true)}
                          >
                            <CiTrash /> Gỡ
                          </span>
                        </div>
                      )}
                    </button>
                  )}
                  {showSpinner && <Spinner coverPic={true} />}
                </>
              )}
            </div>
            <div className="profile__top__info__user">
              {skeleton ? (
                <LoadingSkeleton />
              ) : (
                <>
                  {isLoading ? (
                    <h1 style={{color:"red"}}>Loading...</h1>
                  ) : (
                    <div className="profile__top__info__user__left">
                      <>
                        <span className="profile__top__info__user__left__avatar">
                          <>
                            <span className="profile__top__info__user__left__avatar__image">
                              <span>
                                <img
                                  src={
                                    "/uploads/" +
                                    (userProfile.profilePic
                                      ? userProfile.profilePic
                                      : "no-image.webp")
                                  }
                                  alt={""}
                                />
                              </span>
                            </span>
                            {currentUser.id === parseInt(userId) && (
                              <div
                                onClick={() => setShowModalUpdateAvatar(true)}
                              >
                                <BsCameraFill />
                              </div>
                            )}
                          </>
                        </span>
                        <div className="profile__top__info__user__left__info">
                          <h3>
                            {userProfile.firstName + " " + userProfile.lastName}
                          </h3>
                          <span>{userFriends.length} bạn bè</span>
                          <div className="profile__top__info__user__left__info__list-image">
                            {userFriends.slice(0, 7).map((friend, index) => (
                              <Link
                                key={index}
                                to={routesPublic.profile + "/" + friend.id}
                              >
                                <img
                                  src={"/uploads/" + friend.profilePic}
                                  alt=""
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    </div>
                  )}
                  <div className="profile__top__info__user__right">
                    {currentUser.id === parseInt(userId) ? (
                      <>
                        <Link
                          to={routesPublic.storiesCreate}
                          className="profile__top__info__user__right__btn profile__top__info__user__right__primary"
                        >
                          <IoMdAdd /> Thêm vào tin
                        </Link>
                        <button className="profile__top__info__user__right__btn profile__top__info__user__right__gray">
                          <MdModeEditOutline />
                          Chỉnh sửa trang cá nhân
                        </button>
                      </>
                    ) : (
                      <>
                        {!userFriends.some(
                          (userFriend) => userFriend.id === currentUser.id
                        ) ? (
                          friendsRequest.find(
                            (fq) =>
                              fq.senderId === currentUser.id &&
                              fq.receiverId === parseInt(userId)
                          ) ? (
                            <button
                              className="profile__top__info__user__right__btn profile__top__info__user__right__primary"
                              onClick={handleDeleteRequest}
                            >
                              Hủy lời mời
                            </button>
                          ) : friendsRequest.find(
                              (fq) =>
                                fq.senderId === parseInt(userId) &&
                                fq.receiverId === currentUser.id
                            ) ? (
                            <button className="profile__top__info__user__right__btn profile__top__info__user__right__primary">
                              Chấp nhận lời mời
                            </button>
                          ) : (
                            <button
                              className="profile__top__info__user__right__btn profile__top__info__user__right__primary"
                              onClick={handleAddFriendRequest}
                            >
                              <IoMdAdd /> Thêm bạn
                            </button>
                          )
                        ) : (
                          <button className="profile__top__info__user__right__btn profile__top__info__user__right__primary">
                            <FaUserFriends /> Bạn bè
                          </button>
                        )}
                        <div
                          onClick={handleToConversation}
                          className="profile__top__info__user__right__btn profile__top__info__user__right__gray"
                        >
                          <RiMessengerFill />
                          Nhắn tin
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="profile__top__info__desc">
              <div className="profile__top__info__desc__left">
                {skeleton ? (
                  <LoadingSkeleton width={"100%"} height={"100%"} />
                ) : (
                  <>
                    <span className="select">Bài viết</span>
                    <span>Giới thiệu</span>
                    <span>Bạn bè</span>
                    <span>Ảnh</span>
                    <span>Video</span>
                    <span>Sự kiện</span>
                    <span>Xem thêm</span>
                  </>
                )}
              </div>
              {!skeleton && (
                <div className="profile__top__info__desc__right">
                  <IoIosMore />
                </div>
              )}
            </div>
          </div>
          {coverPic && (
            <UpdateCoverPic setCoverPic={setCoverPic} handleSave={handleSave} />
          )}
        </div>
        <div className="profile__top__content">
          <div className="profile__top__content__left">
            <nav>
              <h3>Giới thiệu</h3>
              {showDescrip && (
                <div className="profile__top__content__left__descrip">
                  {showSpinnerEllipsis ? (
                    <SpinnerEllipsis />
                  ) : (
                    <>
                      <small contentEditable="true">Mô tả thêm về bạn</small>
                      <div className="btns">
                        <Button
                          text={"Hủy"}
                          onClick={() => {
                            setShowDescrip(false);
                            setShowSpinnerEllipsis(true);
                          }}
                          btnReject={true}
                        />
                        <Button
                          text={"Lưu"}
                          btnConfirm={true}
                          onClick={() => {
                            const el = document.querySelector(
                              ".profile__top__content__left__descrip small"
                            );
                            setValueDescrip(el.textContent);
                            setShowDescrip(false);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              {!showDescrip && valueDescrip && (
                <p style={{ textAlign: "center" }}>{valueDescrip}</p>
              )}
              {!showDescrip && (
                <button
                  className="profile__top__content__left__btn"
                  onClick={() => {
                    setShowDescrip(true);
                    setTimeout(() => {
                      setShowSpinnerEllipsis(false);
                    }, 1.2 * 1000);
                  }}
                >
                  Thay đổi tiểu sử
                </button>
              )}
              <div className="profile__top__content__left__info">
                <span>
                  <TiShoppingBag />
                  Học sinh tại <b> {userInfo.studentAt}</b>
                </span>
                <span>
                  <BiHome />
                  Sống tại <b> {userInfo.liveAt}</b>
                </span>
                <span>
                  <CiLocationOn />
                  Đến từ <b> {userInfo.fromAt}</b>
                </span>
                <span>
                  <CiWifiOn />
                  Có <b>{userFriends.length} người theo dõi</b> theo dõi
                </span>
              </div>
              <button className="profile__top__content__left__btn">
                Chỉnh sửa chi tiết
              </button>
              <div className="profile__top__content__left__my-favorite">
                {userFavories.map((el, i) => (
                  <span key={i}>{el}</span>
                ))}
              </div>
              {!modalTodoFavorite && (
                <button
                  className="profile__top__content__left__btn"
                  onClick={() => setModalTodoFavorite(true)}
                >
                  Chỉnh sửa Sở thích
                </button>
              )}
              {stories.filter((el) => el.userId === parseInt(userId)).length <=
              0 ? (
                <h4>Bạn không có bài đăng nào </h4>
              ) : (
                <div className="profile__top__content__left__stories">
                  {stories
                    .filter((el) => el.userId === parseInt(userId))
                    .slice(0, 3)
                    .map((story, index) => (
                      <div
                        key={index}
                        className="profile__top__content__left__stories__story"
                      >
                        <video src={"/uploads/" + story.video} alt="" />
                      </div>
                    ))}
                </div>
              )}

              <button className="profile__top__content__left__btn">
                Chỉnh sửa phần đáng chú ý
              </button>
            </nav>
            <nav>
              <h3>Ảnh</h3>
              <div className="profile__top__content__left__images">
                {userProfile.coverPic && (
                  <div className="profile__top__content__left__images__image">
                    <img src={"/uploads/" + userProfile.coverPic} alt="" />
                  </div>
                )}
                {userProfile.profilePic && (
                  <div className="profile__top__content__left__images__image">
                    <img src={"/uploads/" + userProfile.profilePic} alt="" />
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="profile__top__content__right">
            <Share />
            <Posts ownId={parseInt(userId)} />
          </div>
        </div>
        {showImageUser && (
          <ImageUser
            setCoverPic={setCoverPic}
            setShowImageUser={setShowImageUser}
            ref={imageUserRef}
          />
        )}
        {showModalRemove && (
          <ModalRemove
            handleRemoveCoverPic={handleRemoveCoverPic}
            setShowModalRemove={setShowModalRemove}
          />
        )}
      </div>
      {showModalUpdateAvatar && (
        <UpdateAvatar
          ref={updateAvatarRef}
          userProfile={userProfile}
          setShowModalUpdateAvatar={setShowModalUpdateAvatar}
        />
      )}

      {modalTodoFavorite && (
        <ModalTodosFavorite
          ref={todosFavoriteRef}
          userFavories={userFavories}
          setUserFavories={setUserFavories}
          setModalTodoFavorite={setModalTodoFavorite}
        />
      )}
    </>
  );
}

const ModalRemove = ({ setShowModalRemove, handleRemoveCoverPic }) => {
  return (
    <div className="modal-remove">
      <div className="modal-remove__wrapper">
        <span>
          <h3>Gỡ ảnh bìa</h3>
        </span>
        <p>Bạn có chắc chắn muốn gỡ ảnh bìa không?</p>
        <div className="btns">
          <Button
            onClick={() => setShowModalRemove(false)}
            text="Hủy"
            btnReject
          />
          <Button onClick={handleRemoveCoverPic} text="Xác nhận" btnConfirm />
        </div>
      </div>
    </div>
  );
};

const UpdateCoverPic = ({ setCoverPic, handleSave }) => {
  return (
    <div className="profile__top__confirm-edit">
      <button
        className="profile__top__confirm-edit__reject"
        onClick={() => setCoverPic(null)}
      >
        Hủy
      </button>
      <button className="profile__top__confirm-edit__save" onClick={handleSave}>
        Lưu thay đổi
      </button>
    </div>
  );
};

const ModalTodosFavorite = forwardRef(
  ({ setModalTodoFavorite, setUserFavories, userFavories }, ref) => {
    const [value, setValue] = useState();
    const [newFavorites, setNewFavorites] = useState(userFavories);
    const handleAdd = (e) => {
      if (e.keyCode === 13 && value.trim()) {
        setNewFavorites((prev) => [...prev, value]);
        setValue("");
      }
    };

    const handleDelete = (idx) => {
      setNewFavorites((prev) => prev.filter((pr, i) => i !== idx));
    };
    return (
      <div className="modal-favorite">
        <div className="modal-favorite__container" ref={ref}>
          <div className="modal-favorite__container__header">
            <h3>Sở thích</h3>
            <span onClick={() => setModalTodoFavorite(false)}>X</span>
          </div>
          <div className="modal-favorite__container__add">
            <span>
              <FcAddImage />
              <input
                type={"text"}
                value={value}
                placeholder="Thêm sở thích của bạn."
                onKeyDown={handleAdd}
                onChange={(e) => setValue(e.target.value)}
              />
              {value && (
                <small
                  onClick={() => {
                    setNewFavorites((prev) => [...prev, value]);
                    setValue("");
                  }}
                >
                  <RiAddBoxLine />
                </small>
              )}
            </span>
          </div>
          <div className="modal-favorite__container__wrapper">
            <span>Sở thích đã chọn</span>
            <div className="modal-favorite__container__wrapper__contents">
              {newFavorites.map((el, i) => (
                <span
                  key={i}
                  className="modal-favorite__container__wrapper__contents__content"
                >
                  <small>{el}</small> <p onClick={() => handleDelete(i)}>X</p>
                </span>
              ))}
              {value && (
                <span className="modal-favorite__container__wrapper__contents__content">
                  <small>{value}</small> <p onClick={() => setValue("")}>X</p>
                </span>
              )}
            </div>
          </div>
          <div className="modal-favorite__container__bottom">
            <div className="btns">
              <Button
                text="Hủy"
                onClick={() => {
                  setModalTodoFavorite(false);
                  setValue("");
                }}
                btnReject
              />
              <Button
                text="Lưu"
                btnConfirm
                onClick={() => {
                  let newState = newFavorites;
                  if (value) {
                    newState = [...newFavorites, value];
                  }
                  setUserFavories(newState);
                  setModalTodoFavorite(false);
                  setValue("");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default Profile;
