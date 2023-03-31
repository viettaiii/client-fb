import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

//---My imports
import "./left-bar.scss";
import { imagesLeftBar, imagesBottomLeftBar } from "../../assets/image-icons";
import { routesPublic } from "../../config/routes";
import { UserContext } from "../../context/authContext";
import Avatar from "../Avatar";
import LoadingSkeleton from "../LoadingSkeleton";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";
 function LeftBar() {
  const skeleton = useFirstGoToPage();
  const { currentUser } = useContext(UserContext);
  const [items, setItems] = useState(imagesLeftBar.slice(0, 5));
  const [itemsShortcuts, setItemsShortcuts] = useState(
    imagesBottomLeftBar.slice(0, 5)
  );
  const [showAdd, setShowAdd] = useState(true);
  const [shortcuts, setShortcuts] = useState(true);

  const handleShow = () => {
    setItems(imagesLeftBar);
    setShowAdd(false);
  };
  const handleHide = () => {
    setItems(imagesLeftBar.slice(0, 5));
    setShowAdd(true);
  };
  const handleShowShortcuts = () => {
    setItemsShortcuts(imagesBottomLeftBar);
    setShortcuts(false);
  };
  const handleHideShortcuts = () => {
    setItemsShortcuts(imagesBottomLeftBar.slice(0, 5));
    setShortcuts(true);
  };

  return (
    <div className="left-bar">
        {skeleton ? <LoadingSkeleton height={"20%"} count={5}/> :
        
        <>
        <div className="left-bar__items">
        <Link
          to={routesPublic.profile + "/" + currentUser.id}
          className="left-bar__items__item"
        >
             <Avatar image={currentUser.profilePic} alt={currentUser.firstName}/>
          <span className="left-bar__items__item__name">
            {currentUser.firstName + " " + currentUser.lastName}
          </span>
        </Link>
        {items.map((item, index) => (
          <div key={index} className="left-bar__items__item">
            <img src={item.image} alt="" />
            <span className="left-bar__items__item__name">{item.name}</span>
          </div>
        ))}
        {showAdd ? (
          <>
            <div className="left-bar__items__item" onClick={handleShow}>
              <span className="left-bar__items__item__icon">
                <BsChevronCompactDown />
              </span>
              <span className="left-bar__items__item__name">Xem thêm</span>
            </div>
          </>
        ) : (
          <>
            <div className="left-bar__items__item" onClick={handleHide}>
              <span className="left-bar__items__item__icon">
                <BsChevronCompactUp />
              </span>
              <span className="left-bar__items__item__name">Ẩn bớt</span>
            </div>
          </>
        )}
      </div>
      <div className="left-bar__items">
        <div className="left-bar__items__item">
          <span className="left-bar__items__item__name left-bar__items__item__title">
            Lối tắt của bạn
          </span>
        </div>
        {itemsShortcuts.map((item, index) => (
          <div key={index} className="left-bar__items__item">
            <img src={item.image} alt="" />
            <span className="left-bar__items__item__name">{item.name}</span>
          </div>
        ))}
        {shortcuts ? (
          <>
            <div
              className="left-bar__items__item"
              onClick={handleShowShortcuts}
            >
              <span className="left-bar__items__item__icon">
                <BsChevronCompactDown />
              </span>
              <span className="left-bar__items__item__name">Xem thêm</span>
            </div>
          </>
        ) : (
          <>
            <div
              className="left-bar__items__item"
              onClick={handleHideShortcuts}
            >
              <span className="left-bar__items__item__icon">
                <BsChevronCompactUp />
              </span>
              <span className="left-bar__items__item__name">Ẩn bớt</span>
            </div>
          </>
        )}
      </div>
        </>
        }
      
    </div>
  );
}

export default LeftBar;
