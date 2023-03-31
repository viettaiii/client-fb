import { useSocket } from "../../hooks/useSocket";
import { useUserFriend } from "../../hooks/useUserFriend";
import Avatar from "../Avatar";

function Account({ conversation }) {
  const [usersOn] = useSocket();
  const user = useUserFriend(conversation);
  return (
    <div className="chat__accounts__account">
      <div className="chat__accounts__account__avatar">
        <Avatar image={user.profilePic} alt={user.firstName} />
        {usersOn.includes(user.id) && (
          <span className="chat__accounts__account__avatar__status" />
        )}
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
