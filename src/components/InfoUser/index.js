import Avatar from "../Avatar";

import './info-user.scss';
function InfoUser({user ,usersOn , active }) {
  return (
    <div className={`info-user ${active ? "active":""}`}>
      <span className="info-user__avatar">
        <Avatar
          image={user.profilePic ? user.profilePic : ""}
          alt={user.firstName ? user.firstName : ""}
        />
        { usersOn.includes(user.id) && (
          <span className="info-user__avatar__online" />
        )}
      </span>
      <div className="info-user__info">
        <p className="info-user__info__name">
          {user.firstName + " " + user.lastName}
        </p>
        <p className="info-user__info__time"></p>
      </div>
    </div>
  );
}

export default InfoUser;
