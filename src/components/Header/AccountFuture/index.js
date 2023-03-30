import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

//-my imports
import "./account.scss";
import { routesPublic } from "../../../config/routes";
import React, { forwardRef, useContext, useState } from "react";
import Futures from "../Futures";
import {
  accountFutures,
  settingFutures,
  heplerFutures,
  screenFutures,
} from "../../../assets/futures";
import { UserContext } from "../../../context/authContext";

const AccountFuture = forwardRef(({ setShowAccountSetting }, ref) => {
  const [showFuturesAccount, setShowFuturesAccount] = useState(true);
  const [showFuturesSetting, setShowFuturesSetting] = useState(false);
  const [showFuturesHelper, setShowFuturesHelper] = useState(false);
  const [showFuturesDarkMode, setShowFuturesDarkMode] = useState(false);
  const {currentUser} = useContext(UserContext);
 
  return (
    <div className="account" ref={ref}>
      {showFuturesAccount && (
        <>
          <Link
            onClick={() => setShowAccountSetting(false)}
            to={routesPublic.profile + "/" + currentUser.id}
            className="account__info"
          >
            <img src={currentUser.profilePic ? "/uploads/"+currentUser.profilePic :"/uploads/no-image.webp" } alt={currentUser.firstName} />
            <span className="account__info__name">{currentUser.firstName +" "+currentUser.lastName }</span>
          </Link>
          <Futures
            fcShowFutures={{
              setShowFuturesSetting,
              setShowFuturesHelper,
              setShowFuturesAccount,
              setShowFuturesDarkMode,
            }}
            futures={accountFutures}
          />
        </>
      )}
      {showFuturesSetting && (
        <>
          <div className="account__setting">
            <BsArrowLeft
              onClick={() => {
                setShowFuturesAccount(true);
                setShowFuturesSetting(false);
              }}
              className="account__setting__back"
            />{" "}
            <h3>Cài đặt & riêng tư</h3>
          </div>
          <Futures
            fcShowFutures={{
              setShowFuturesSetting,
              setShowFuturesHelper,
              setShowFuturesAccount,
              setShowFuturesDarkMode,
            }}
            futures={settingFutures}
          />
        </>
      )}

      {showFuturesHelper && (
        <>
          <div className="account__setting">
            <BsArrowLeft
              onClick={() => {
                setShowFuturesAccount(true);
                setShowFuturesHelper(false);
              }}
              className="account__setting__back"
            />{" "}
            <h3>Trợ giúp & hỗ trợ</h3>
          </div>
          <Futures
            fcShowFutures={{
              setShowFuturesSetting,
              setShowFuturesHelper,
              setShowFuturesAccount,
              setShowFuturesDarkMode,
            }}
            futures={heplerFutures}
          />
        </>
      )}

      {showFuturesDarkMode && (
        <>
          <div className="account__setting">
            <BsArrowLeft
              onClick={() => {
                setShowFuturesAccount(true);
                setShowFuturesDarkMode(false);
              }}
              className="account__setting__back"
            />{" "}
            <h3>Màn hình & trợ năng</h3>
          </div>
          <Futures
            typeOther={true}
            fcShowFutures={{
              setShowFuturesSetting,
              setShowFuturesHelper,
              setShowFuturesAccount,
              setShowFuturesDarkMode,
            }}
            futures={screenFutures}
          />
        </>
      )}
    </div>
  );
});

export default AccountFuture;
