import { useContext, useState } from "react";
import PropTypes from "prop-types";
import httpsRequest from "../../../../api/axios";
import { accountFutures, screenFutures } from "../../../../assets/futures";
import { UserContext } from "../../../../context/authContext";
import { DarkModeContext } from "../../../../context/darkModeContext";
import Spinner from "../../../Modal/Spinner";
function Future({ future, fcShowFutures, typeOther }) {
  const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
  const [showSpinner ,setShowSpinner] = useState(false);
  const{logout} = useContext(UserContext);
  const handleSetFuture = async (e) => {
      if(!e.target === document.querySelector('.account__futures__future')) return;
    switch (e.target.textContent.trim()) {
      case accountFutures[0].text.trim():
          fcShowFutures.setShowFuturesSetting(true);
        fcShowFutures.setShowFuturesAccount(false);
        fcShowFutures.setShowFuturesHelper(false);
        fcShowFutures.setShowFuturesDarkMode(false);
        break;
      case accountFutures[1].text.trim():
          fcShowFutures.setShowFuturesHelper(true);
        fcShowFutures.setShowFuturesAccount(false);
        fcShowFutures.setShowFuturesSetting(false);
        fcShowFutures.setShowFuturesDarkMode(false);
        break;
        case accountFutures[2].text.trim():
            fcShowFutures.setShowFuturesDarkMode(true);
            fcShowFutures.setShowFuturesAccount(false);
            fcShowFutures.setShowFuturesHelper(false);
            fcShowFutures.setShowFuturesSetting(false);
            break;
        case accountFutures[4].text.trim():
              try {
                setShowSpinner(true);
                setTimeout(async () => {
                  await httpsRequest.post('/api/auth/logout');
                  logout();
                },(4*1000));
              }
              catch(e) {
                console.log("Error" ,e);
              }

            break;
      default:
        alert("Chức năng này chưa có,quay trở lại thử chức năng khác nhé");
    }
  };
  const handleSetOff = () => {
    if(!darkMode ) return ;
    toggleDarkMode()
  }
  const handleSetOn = () => {
    if(darkMode ) return ;
    toggleDarkMode();
}
  return (
    <>
      {typeOther ? (
        <>
          <div className="account__futures__future account__futures__disable-hover" onClick={handleSetFuture}>
            <div>
            <span className="account__futures__future__one">
              {" "}
              <span className="account__futures__future__one__icon">
                {future.icon}
              </span>
              <p className="account__futures__future__one__text-other">Điều chỉnh giao diện của Facebook để giảm độ chói và cho đôi mắt được nghỉ ngơi.</p>
            {future.text}
            </span>
            </div>
          </div>
          <div className="account__futures__future__nodes">
          {future.text === screenFutures[0].text &&  <>
            <div className="account__futures__future__nodes__node" onClick={handleSetOff}><span>Tắt</span>  <span  className={`account__futures__future__nodes__node__${darkMode ? "turn-off":"turn-on"}`} ></span></div>
                <div className="account__futures__future__nodes__node" onClick={handleSetOn}><span>Bật</span> <span  className={`account__futures__future__nodes__node__${!darkMode ? "turn-off":"turn-on"}`} ></span></div>
          </>}
          {future.text === screenFutures[1].text &&  <>
            <div className="account__futures__future__nodes__node"><span>Tắt</span>  <span  className={`account__futures__future__nodes__node__turn-off`}></span></div>
                <div className="account__futures__future__nodes__node"><span>Bật</span> <span  className={`account__futures__future__nodes__node__turn-on`}></span></div>
          </>}
               
          </div>
        </>
      ) : (
        <>
          <div className="account__futures__future" onClick={handleSetFuture}>
            <span className="account__futures__future__one">
              {" "}
              <span className="account__futures__future__one__icon">
                {future.icon}
              </span>
              {future.text}
            </span>
            {future.iconRight}
          </div>
        </>
      )}
     {showSpinner &&  <Spinner />}
    </>
  );
}

Future.propTypes = {
  future : PropTypes.object,
   fcShowFutures : PropTypes.object,
}
export default Future;
