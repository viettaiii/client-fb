import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneVideoCamera, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect} from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// My imports
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
import { UserContext } from "../../context/authContext";
import LoadingSkeleton from "../LoadingSkeleton";
import Button from "../Button";
import {
  getFriendsRequest,
} from "../../redux/actions/friendRequest";
import {

  getUserFriends,
  getUserOthers,
} from "../../redux/actions/friend";
import Avatar from "../Avatar";
import "./right-bar.scss";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";
  import { SocketContext } from "../../context/socketContext";
function RightBar() {
  const skeleton = useFirstGoToPage();
  const { userFriends } = useSelector((state) => state.userFriends);
  const { userOthers } = useSelector((state) => state.userOthers);
  const { friendsRequest } = useSelector((state) => state.friendsRequest);
  const {usersOn ,confirmFriend}= useContext(SocketContext);
  const dispatch = useDispatch();
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    dispatch(getUserFriends(currentUser.id));
    dispatch(getUserOthers(currentUser.id));
    dispatch(getFriendsRequest());
  }, [dispatch]);
  const handleAddFriend = async (userId_2) => {
   const inputs = { userId_1: currentUser.id, userId_2 };
   await  confirmFriend(inputs)
  };
  return (
    <div className="right-bar">
      <div className="right-bar__items">
        {skeleton ? (
          <LoadingSkeleton height={"20%"} width={"100%"} count={5} />
        ) : (
          <>
            <div className="right-bar__items__title">
              <h4>Lời mời kết bạn</h4>
              <span>Xem tất cả</span>
            </div>
            {friendsRequest
              .filter((item) => item.receiverId === currentUser.id)
              .slice(0, 2)
              .map((user, index) => (
                <div key={index} className="right-bar__items__item">
                  <Avatar
                    to={routesPublic.profile + "/" + user.id}
                    image={user.profilePic}
                    alt={user.firstName}
                  />
                  <div className="right-bar__items__item__right">
                    <div className="right-bar__items__item__right__title">
                      <h6>{user.firstName + " " + user.lastName}</h6>
                      <span>{moment(user.createdAt).fromNow("mm")}</span>
                    </div>
                    <div className="btns">
                      <Button
                        btnConfirm={true}
                        onClick={() => handleAddFriend(user.id)}
                        text="Xác nhận"
                      />
                      <Button btnReject={true} text="Xóa" />
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>

      <div className="right-bar__items">
        {skeleton ? (
          <LoadingSkeleton height={"30px"} width={"100%"} count={3} />
        ) : (
          <>
            <div className="right-bar__items__title">
              <h4>Sinh nhật</h4>
            </div>
            <div className="right-bar__items__item">
              <img
                className="right-bar__items__item__birthday-img"
                src="https://static.vecteezy.com/system/resources/previews/002/476/508/original/color-glossy-happy-birthday-balloons-banner-background-illustration-free-vector.jpg"
                alt=""
              />
              <p className="right-bar__items__item__birthday">
                Hôm nay là sinh nhật của <a href="">Giàng An Quản</a> và{" "}
                <a href="">Thùy Trang</a>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Người liên hệ  */}
      <div className="right-bar__items">
        {skeleton ? (
          <LoadingSkeleton height={"100px"} width={"100%"} count={2} />
        ) : (
          <>
            <div className="right-bar__items__title">
              <h4>Bạn của tôi</h4>
              <div className="right-bar__items__title__icons">
                <AiTwotoneVideoCamera />
                <AiOutlineSearch />
                <HiOutlineDotsHorizontal />
              </div>
            </div>
            <div className="right-bar__items__accounts">
              {userFriends.map(
                (user, index) =>
                  currentUser.id !== user.id && (
                    <Link
                      to={routesPublic.profile + "/" + user.id}
                      key={index}
                      className="right-bar__items__accounts__account"
                    >
                      <div className="right-bar__items__accounts__account__image">
                        <img src={"/uploads/" + user.profilePic} alt="" />
                        {usersOn.includes(user.id) && (
                          <span className="right-bar__items__accounts__account__image__circle" />
                        )}
                      </div>
                      <span className="right-bar__items__accounts__account__name">
                        {user.firstName + " " + user.lastName}
                      </span>
                    </Link>
                  )
              )}
            </div>
          </>
        )}
      </div>

      <div className="right-bar__items">
        <div className="right-bar__items__title">
          {skeleton ? (
            <LoadingSkeleton height={"100%"} width={"100%"} count={1} />
          ) : (
            <h4>Gợi ý kết bạn</h4>
          )}
        </div>
        <div className="right-bar__items__accounts">
          {userOthers.map(
            (user, index) =>
              currentUser.id !== user.id && (
                <Link
                  to={routesPublic.profile + "/" + user.id}
                  key={index}
                  className="right-bar__items__accounts__account"
                >
                  {skeleton ? (
                    <LoadingSkeleton height={"100%"} width={"100%"} count={1} />
                  ) : (
                    <>
                      <div className="right-bar__items__accounts__account__image">
                        <img src={"/uploads/" + user.profilePic} alt="" />
                        {usersOn.includes(user.id) && (
                          <span className="right-bar__items__accounts__account__image__circle" />
                        )}
                      </div>
                      <span className="right-bar__items__accounts__account__name">
                        {user.firstName + " " + user.lastName}
                      </span>
                    </>
                  )}
                </Link>
              )
          )}
        </div>
      </div>
                        
    </div>
  );
}

export default RightBar;
