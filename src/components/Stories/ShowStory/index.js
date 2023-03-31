import "./show-story.scss";

import { Link } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Myimport
import { getStories } from "../../../redux/actions/story";
import moment from "moment";
import Videos from "../../Videos";
import { routesPublic } from "../../../config/routes";
import HeaderRight from "../../Header/HeaderRight";
import LoadingSkeleton from "../../LoadingSkeleton";
import Avatar from "../../Avatar";
import { useFirstGoToPage } from "../../../hooks/useFirstGoToPage";
function ShowStory() {
  const skeleton = useFirstGoToPage();
  const storiesRe = useSelector((state) => state.stories);
  const { stories } = storiesRe;
  const [idShow, setIdShow] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);
  const handleChangeSlide = (swiper) => {
    setIdShow(swiper.activeIndex);
  };

  return (
    <div className="show-story">
      <div className="show-story__left">
        <div className="show-story__left__header">
          <Link
            to={routesPublic.home}
            className="show-story__left__header__close"
          >
            {skeleton ? <LoadingSkeleton circle="true" /> : <AiOutlineClose />}
          </Link>
          <Link
            to={routesPublic.home}
            className="show-story__left__header__img"
          >
            {skeleton ? (
              <LoadingSkeleton circle="true" />
            ) : (
              <img src="/logo.png" alt="" />
            )}
          </Link>
        </div>
        <div className="show-story__left__setting">
          <div className="show-story__left__setting__title">
            {skeleton ? <LoadingSkeleton width={50} /> : <h5>Tin </h5>}
          </div>
        </div>
        <div className="show-story__left__details">
          {skeleton ? (
            <LoadingSkeleton count={2} />
          ) : (
            <>
              {" "}
              <span>Kho lưu trữ</span>
              <span>Cài đặt</span>
            </>
          )}
        </div>

        <h4 className="show-story__left__your-stories">
          {skeleton ? <LoadingSkeleton width={50} /> : <> Tin của bạn </>}
        </h4>
        <Link
          to={routesPublic.storiesCreate}
          className="show-story__left__create-your-story"
        >
          {skeleton ? (
            <LoadingSkeleton width={100} height={100} />
          ) : (
            <>
              {" "}
              <span className="show-story__left__create-your-story__image">
                <MdAdd />
              </span>
              <div className="show-story__left__create-your-story__info">
                <h4>Tạo tin</h4>
                <span>Bạn có thể chia sẻ ảnh hoặc viết gì đó</span>
              </div>{" "}
            </>
          )}
        </Link>

        <h4 className="show-story__left__your-stories">
          {skeleton ? <LoadingSkeleton width={100} /> : <> Tất cả tin </>}
        </h4>
        <div className="show-story__left__all-stories">
          {stories.map((story, index) =>
            skeleton ? (
              <LoadingSkeleton width={300} height={50} />
            ) : (
              <>
                {" "}
                <div
                  className={`show-story__left__all-stories__item ${
                    index === idShow ? "select" : ""
                  }`}
                  key={index}
                >
                  <span className="show-story__left__all-stories__item__image">
                    <Avatar image={story.profilePic} alt={story.firstName} />
                  </span>
                  <div className="show-story__left__all-stories__item__info">
                    <h4>{story.firstName + " " + story.lastName}</h4>
                    <span>{moment(story.createdAt).fromNow("mm")}</span>
                  </div>
                </div>{" "}
              </>
            )
          )}
        </div>
        <div></div>
      </div>
      <div className="show-story__right">
        <Videos
          handleChangeSlide={handleChangeSlide}
          stories={stories}
          idShow={idShow}
          setIdShow={setIdShow}
        />
      </div>
      <div className="show-story__right-header">
        {skeleton ? (
          <LoadingSkeleton width={100} />
        ) : (
          <HeaderRight />
        )}
      </div>
    </div>
  );
}

export default ShowStory;
