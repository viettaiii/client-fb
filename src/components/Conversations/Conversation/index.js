import { useCallback, useContext, useEffect, useState } from "react";
import { getUserAxios } from "../../../api/method";
import { UserContext } from "../../../context/authContext";
import InfoUser from "../../InfoUser";
import SpinnerEllipsis from "../../Modal/SpinnerEllipsis";

function Conversation({ conversation, active, usersOn }) {
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(UserContext);
  const getUser = useCallback(async (friendId) => {
   const data =  await getUserAxios(friendId);
   setUser(data);
  },[conversation])
  useEffect(() => {
    const { id, ...others } = conversation;
    const friendId = Object.values(others).find(
      (userId) => userId !== currentUser.id
    );
    getUser(friendId);
  }, [conversation]);
  return (
    <>
    {!user ? <SpinnerEllipsis/> :  <InfoUser usersOn={usersOn} user={user} active={active}/>} 
    </>
  );
}

export default Conversation;
