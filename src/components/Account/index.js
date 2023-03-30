import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getUserAxios } from "../../api/method";
import { UserContext } from "../../context/authContext";
import Avatar from "../Avatar";

function Account({ conversation }) {
  const [user, setUser] = useState({});
  const [usersOn, setUsersOn] = useState([]);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    const { id, ...others } = conversation;
    const friendId = Object.values(others).find(
      (userId) => userId !== currentUser.id
    );
    const getUser = async () => {
      const data = await getUserAxios(friendId);
      setUser(data);
    };
    getUser();
  }, [conversation]);
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
  return (
    <div className="chat__accounts__account">
      <div className="chat__accounts__account__avatar">
        <Avatar image={user.profilePic} alt={user.firstName} />
      {usersOn.map(u => u.userId).includes(user.id) && <span className="chat__accounts__account__avatar__status"/>}  
      </div>
      <div className="chat__accounts__account__right">
        <span className="chat__accounts__account__right__name">
          {user.firstName + " " + user.lastName}
        </span>
      </div>
      <span className="chat__accounts__account__seen">
        <Avatar image={user.profilePic} alt={user.firstName} />
      </span>
    </div>
  );
}

export default Account;
