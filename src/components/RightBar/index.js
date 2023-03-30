import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneVideoCamera, AiOutlineSearch } from "react-icons/ai";
import {io} from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


// My imports
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
import { UserContext } from "../../context/authContext";
import LoadingSkeleton from "../LoadingSkeleton";
import Button from "../Button";
import {   deleteFriendRequest, getFriendsRequest} from "../../redux/actions/friendRequest";
import { addUserFriend, getUserFriends, getUserOthers } from "../../redux/actions/friend";
import Avatar from '../Avatar';
import "./right-bar.scss";

let isFirstLoading = true;
function RightBar() {
  const { userFriends } = useSelector((state) => state.userFriends);
  const { userOthers } = useSelector((state) => state.userOthers);
  const [usersOn, setUsersOn] = useState([]);
  const {friendsRequest} = useSelector(state => state.friendsRequest);
  
  const dispatch = useDispatch();
  const {currentUser} =useContext(UserContext);
  const [skeleton, setSkeleton] = useState(true);
  const socket = useRef();
  
  useEffect(() => {
    socket.current = io('ws://localhost:9111');
  },[])
  useEffect(() => {
    socket.current.emit("addUser" , currentUser.id);
    socket.current.on("getUsers", (users) => {
      setUsersOn(users);
    });
  },[currentUser])
  useEffect(() => {
    dispatch(getUserFriends(currentUser.id));
    dispatch(getUserOthers(currentUser.id));
    dispatch(getFriendsRequest());
  }, [dispatch]);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false)
      isFirstLoading = false;
    },(4 * 1000))
  },[])


  const handleAddFriend = async (userId_2) => {
      await dispatch(addUserFriend({userId_1 : currentUser.id , userId_2}))
      await dispatch(deleteFriendRequest({receiverUserId : currentUser.id, senderUserId : userId_2 }))
  }
  return (
    <div className="right-bar">
    <div className="right-bar__items">
    {isFirstLoading && skeleton ? <LoadingSkeleton height={"20%"} width={"100%"} count={5}/> :
       <>
       <div className="right-bar__items__title">
          <h4>Lời mời kết bạn</h4>
          <span>Xem tất cả</span>
        </div>
        {friendsRequest.filter(item => item.receiverUserId === currentUser.id).slice(0,2).map((user, index) => (
          <div  key={index} className="right-bar__items__item">
          <Avatar to={routesPublic.profile+"/"+user.id} image={user.profilePic} alt={user.firstName}/>
            <div className="right-bar__items__item__right">
              <div className="right-bar__items__item__right__title">
                <h6>{user.firstName + " " + user.lastName}</h6>
                <span>{ moment(user.createdAt).fromNow("mm")}</span>
              </div>
              <div className="btns">
                <Button btnConfirm={true} onClick={ () => handleAddFriend(user.id)} text="Xác nhận" />
                <Button btnReject={true} text="Xóa" />
              </div>
            </div>
          </div>
        ))}
       </>
    }
      </div>
    

      <div className="right-bar__items">
      {isFirstLoading && skeleton ? <LoadingSkeleton height={"30px"} width={"100%"} count={3}/> :
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
      }
      </div>

      {/* Người liên hệ  */}
      <div className="right-bar__items">
      {isFirstLoading && skeleton ? <LoadingSkeleton height={"100px"} width={"100%"} count={2}/> :
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
          {userFriends.map((user, index) => (
            currentUser.id !== user.id && (<Link to={routesPublic.profile+"/"+user.id} key={index} className="right-bar__items__accounts__account">
              <div className="right-bar__items__accounts__account__image">
                <img src={"/uploads/"+user.profilePic} alt="" />
             {usersOn.map(u => u.userId).includes(user.id) &&   <span className="right-bar__items__accounts__account__image__circle"/>} 
              </div>
              <span className="right-bar__items__accounts__account__name">
                {user.firstName +" "+user.lastName}
              </span>
            </Link>)
            
          ))}
        </div>
       </>
      }
      </div>
   
      <div className="right-bar__items">
        <div className="right-bar__items__title">
        {isFirstLoading && skeleton ? <LoadingSkeleton height={"100%"} width={"100%"} count={1}/> :
          <h4>Gợi ý kết bạn</h4>
        }
        </div>
        <div className="right-bar__items__accounts">
          {userOthers.map((user, index) => (
            currentUser.id !== user.id && (<Link to={routesPublic.profile+"/"+user.id} key={index} className="right-bar__items__accounts__account">
            {isFirstLoading && skeleton ? <LoadingSkeleton height={"100%"} width={"100%"} count={1}/> :
              <><div className="right-bar__items__accounts__account__image">
                <img src={"/uploads/"+user.profilePic} alt="" />
             {usersOn.map(u => u.userId).includes(user.id) &&  <span className="right-bar__items__accounts__account__image__circle"/>  }  
              </div>
              <span className="right-bar__items__accounts__account__name">
                {user.firstName +" "+user.lastName}
              </span></>

            }
            </Link>)
            
          ))}
        </div>
      </div>
     
    </div>
  );
}

export default RightBar;
