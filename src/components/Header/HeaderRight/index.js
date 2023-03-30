import { FaFacebookMessenger } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import TextHover from "../TextHover";
import ComNotification from "../../Notification";
import AccountFuture from "../AccountFuture";
import {  useContext, useEffect, useRef, useState } from "react";
import "./header-right.scss";
import Chat from "../../Chat";
import Menu from "../../Menu";
import { UserContext } from "../../../context/authContext";
import LoadingSkeleton from "../../LoadingSkeleton";
import Avatar from "../../Avatar";
import { useDispatch, useSelector } from "react-redux";
import {  getMessages } from "../../../redux/actions/messenge";
import { io } from "socket.io-client";

let isFirstLoading = true;
function HeaderRight({ isHideMessage }) {
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
      isFirstLoading = false;
    }, 4 * 1000);
  }, []);

  const [currentMess, setCurrentMess] = useState({});
  const { currentUser } = useContext(UserContext);
  const [showAccountSetting, setShowAccountSetting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [usersOn, setUsersOn] = useState([]);
  const accountRef = useRef();
  const notificationRef = useRef();
  const chatRef = useRef();
  const menuRef = useRef();
  const { messenges } = useSelector((state) => state.messenges);
  const dispatch = useDispatch();
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:9111");
  }, []);
  useEffect(() => {
    socket.current.on("getUsers", (users) => {
      setUsersOn(users);
    });
  }, [currentUser]);
  useEffect(() => {
    function handleClickOutsideAccount(e) {
      const el = document.querySelector(".header__right__one.select");
      if (el && el.title === "account" && el.contains(e.target)) {
        setShowAccountSetting(true);
      } else {
        if (accountRef.current && !accountRef.current.contains(e.target)) {
          setShowAccountSetting(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, [accountRef]);
  useEffect(() => {
    function handleClickOutsideAccount(e) {
      const el = document.querySelector(".header__right__one.select");
      if (el && el.title === "notifi" && el.contains(e.target)) {
        setShowNotification(true);
      } else {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(e.target)
        ) {
          setShowNotification(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, [notificationRef]);
  useEffect(() => {
    function handleClickOutsideAccount(e) {
      const el = document.querySelector(".header__right__one.select");
      if (el && el.title === "chat" && el.contains(e.target)) {
        setShowChat(true);
      } else {
        if (chatRef.current && !chatRef.current.contains(e.target)) {
          setShowChat(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, [chatRef]);
  useEffect(() => {
    function handleClickOutsideAccount(e) {
      const el = document.querySelector(".header__right__one.select");
      if (el && el.title === "menu" && el.contains(e.target)) {
        setShowMenu(true);
      } else {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, [menuRef]);
  useEffect(() => {
    currentMess && dispatch(getMessages(currentMess.id));
  }, [currentMess]);

  return (
    <div className="header__right">
      <div
        className={`header__right__one ${showMenu ? "select" : ""} mobile-none`}
        title="menu"
      >
        {skeleton && isFirstLoading ? (
          <LoadingSkeleton circle="true" />
        ) : (
          <>
            <TiThMenu
              className="header__right__one__icon "
              onClick={() => setShowMenu(!showMenu)}
            />
            <TextHover text={"Menu"} />
            {showMenu && <Menu ref={menuRef} />}
          </>
        )}
      </div>
      <div className="header__right__one mobile-display screen-large-992-none">
        {skeleton && isFirstLoading ? (
          <LoadingSkeleton circle="true" />
        ) : (
          <>
            <GrAdd className="header__right__one__icon " />
          </>
        )}
      </div>
      {!isHideMessage && (
        <div
          className={`header__right__one ${showChat ? "select" : ""}`}
          title="chat"
        >
          {skeleton && isFirstLoading ? (
            <LoadingSkeleton circle="true" />
          ) : (
            <>
              <FaFacebookMessenger
                className="header__right__one__icon"
                onClick={() => setShowChat(!showChat)}
              />
              <TextHover text={"Messenger"} />
              {showChat && (
                <Chat usersOn={usersOn} setCurrentMess={setCurrentMess} setShowChat={setShowChat} ref={chatRef} />
              )}
            </>
          )}
        </div>
      )}

      <div
        className={`header__right__one ${showNotification ? "select" : ""}`}
        title="notifi"
      >
        {skeleton && isFirstLoading ? (
          <LoadingSkeleton circle="true" />
        ) : (
          <>
            <TextHover text={"Thông báo"} />
            <IoMdNotifications
              className="header__right__one__icon"
              onClick={() => setShowNotification(!showNotification)}
            />
            <span className="header__right__one__notifi">5</span>
            {showNotification && <ComNotification ref={notificationRef} />}
          </>
        )}
      </div>
      <div
        className={`header__right__one ${showAccountSetting ? "select" : ""}`}
        title="account"
      >
        {skeleton && isFirstLoading ? (
          <LoadingSkeleton circle="true" />
        ) : (
          <>
            {" "}
            <TextHover text={"Tài khoản"} />
            <Avatar
              className="header__right__one__avatar"
              image={currentUser.profilePic}
              alt={currentUser.firstName}
              onClick={() => setShowAccountSetting(!showAccountSetting)}
            />
            {showAccountSetting && (
              <AccountFuture
                setShowAccountSetting={setShowAccountSetting}
                ref={accountRef}
              />
            )}
          </>
        )}
      </div>
      {/* <div className="modal-messenger">
          {currentMess && <ModalMess  messenges={messenges}  currentMess={currentMess} setCurrentMess={setCurrentMess}/>}
      </div> */}
    </div>
  );
}
export default HeaderRight;



// const ModalMess = ({ messenges, currentMess ,setCurrentMess }) => {
 
//   const [user, setUser] = useState(null);
//   const { currentUser } = useContext(UserContext);
//   const scrollRef = useRef();
//   const socket = useRef();
//   useEffect(() => {
//     scrollRef.current &&  scrollRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [scrollRef , currentMess]);
//   useEffect(() => {
//     if (!currentMess) return;
//     const { id, ...others } = currentMess;
//     const friendId = Object.values(others).find(
//       (userId) => userId !== currentUser.id
//     );
//     const getUser = async () => {
//       const data = await getUserAxios(friendId);
//       setUser(data);
//     };
//     getUser();
//   }, [currentMess, messenges]);
  
//   useEffect(() => {
//     socket.current = io("ws://localhost:9111");
//   }, []);
//   useEffect(() => {
//     socket.current.on("getUsers", (users) => {
//         console.log(users);
//     });
//   }, [currentMess]);
//   return (
//     <>
//       {user && (
//         <div className="messenger__one">
//           <div className="messenger__one__header">
//             <span className="messenger__one__header__avatar">
//               <Avatar image={user.profilePic} alt={user.firstName} />
//               <small />
//             </span>
//             <p className="messenger__one__header__name">
//               {user.firstName + " " + user.lastName}
//             </p>
//             <AiFillCloseCircle  onClick={() =>setCurrentMess(null)}/>
//           </div>
//           <form id="modal-mess" action="POST">
//             <div className="messenger__one__contents" >
//               {messenges.map((mess, i) => (
//                 <div
//                   ref={scrollRef}
//                   key={i}
//                   className={`messenger__one__contents__content ${
//                     mess.senderId === currentUser.id ? "own" : ""
//                   }`}
//                 >
//                   <Avatar image={user.profilePic} alt={user.firstName} />
//                   <p>{mess.text}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="messenger__one__bottom">
//               <input type="text"  placeholder="Aa" />
//               <button type="submit" >Gửi</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };
