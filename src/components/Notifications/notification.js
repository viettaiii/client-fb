import { useEffect, useState } from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { getUserAxios } from "../../api/method";
import Avatar from "../Avatar";
import moment from 'moment';
function Notification({ notification }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async (userId) => {
      const data = await getUserAxios(userId);
      setUser(data);
    };
    getUser(notification.senderId);
  }, [notification]);
  return (
    <>
      {user && (
        <div className="notifications__items__item">
          <div className="notifications__items__item__image">
            <Avatar image={user.profilePic} />
            <span className="notifications__items__item__image__icon">
              <BsFillCameraReelsFill />
            </span>
          </div>
          <div className="notifications__items__item__text">
            <p>
              {" "}
              <span className="notifications__items__item__text__name">
                {user.firstName + " " + user.lastName + "   : "}
              </span>
              {notification.text}
            </p>
            <span className="notifications__items__item__text__createdAt">
              {moment(notification.createdAt).fromNow("mm")}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
