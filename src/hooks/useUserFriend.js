import { useContext, useEffect, useState } from "react";
import { getUserAxios } from "../api/method";
import { UserContext } from "../context/authContext";

export function useUserFriend(options) {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (options) {
      const getUser = async (friendId) => {
        const data = await getUserAxios(friendId);
        setUser(data);
      };
      if (typeof options === "object") {
        const { id, ...others } = options;
        const friendId = Object.values(others).find(
          (userId) => userId !== currentUser.id
        );
        getUser(friendId);
      }
    }
  }, [options]);
  return user;
}
