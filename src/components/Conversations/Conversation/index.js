import { useContext, useEffect, useState } from "react";
import { getUserAxios } from "../../../api/method";
import { UserContext } from "../../../context/authContext";
import Avatar from "../../Avatar";


function Conversation({conversation ,active , usersOn}) {
    const [user , setUser] = useState({});
    const {currentUser} = useContext(UserContext);
    useEffect(() => {
       const {id , ...others} = conversation;
       const friendId = Object.values(others).find(userId => userId !== currentUser.id);
       const getUser = async () => {
          const data = await getUserAxios(friendId);
          setUser(data);
       }
       getUser();
    }, [conversation])
    return (
       <>
             <div className={`conversations__bottom__conversation ${active ? "active" :""}`}>
       <span className="conversations__bottom__conversation__avatar">
       <Avatar image={user.profilePic ? user.profilePic : ""} alt={user.firstName ? user.firstName : ""} />
       {usersOn.includes(user.id) &&  <span className="conversations__bottom__conversation__avatar__online"/>}
       
       </span>
       <div className="conversations__bottom__conversation__info">
           <p className="conversations__bottom__conversation__info__name">{user.firstName + " " + user.lastName}</p>
           <p className="conversations__bottom__conversation__info__time"></p>
       </div>
    </div>
     
       </>
      );
}

export default Conversation;