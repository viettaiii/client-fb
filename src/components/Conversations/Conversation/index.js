import { useCallback, useContext, useEffect, useState } from "react";
import { getUserAxios } from "../../../api/method";
import { UserContext } from "../../../context/authContext";
import InfoUser from "../../InfoUser";

function Conversation({ conversation, active, usersOn }) {
  const [user, setUser] = useState({});
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
      <InfoUser usersOn={usersOn} user={user} active={active}/>
    </>
  );
}

export default Conversation;
