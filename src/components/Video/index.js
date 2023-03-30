import { useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { GoUnmute } from "react-icons/go";
import { useDispatch } from "react-redux";
import StoryProgress from "../StoryProgress";
import moment from "moment";
import { UserContext } from "../../context/authContext";
import { deleteStory } from "../../redux/actions/story";
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
function Video({ story, idShow ,setIdShow}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCanDelete, setShowCanDelete] = useState(false);
  const videoRef = useRef(null);
  const { currentUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      videoRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    setIsPlaying(false);
    const videos = document.querySelectorAll('.show-story__right__videos__video video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0 ;
    })
    videos[idShow].play();
  }, [idShow,story]);
  const handleDelete = async () => {
    await dispatch(deleteStory(story.id));
    setShowCanDelete(false);
  };
  return (
    <div className={`show-story__right__videos__video`}>
      {story.video.endsWith(".mov") ||
      story.video.endsWith(".mp3") ||
      story.video.endsWith(".mp4") ? (
        <video
          autoPlay={true}
          ref={videoRef}
          playsInline
          src={"/uploads/" + story.video}
          alt=""
        ></video>
      ) : (
       <>
       <img alt="" src={`/uploads/${story.video}`} />
         <video
        ></video>
       </>
      )}
      <div className="show-story__right__videos__video__duration">
      {story.video.endsWith('.mov') || story.video.endsWith('.mp3') || story.video.endsWith('.mp4') &&  <StoryProgress idShow={idShow} setIdShow={setIdShow} setIsPlaying={setIsPlaying} ref={videoRef} />} 
           
      </div>
      <div className="show-story__right__videos__video__info">
        <p>
        <Link to={routesPublic.profile+"/"+story.userId}>
          <img src={"/uploads/" + story.profilePic} alt="" />
        </Link>
          <span>
            <h5>
              {story.firstName + " " + story.lastName}{" "}
              <span>{moment(story.createdAt).fromNow()}</span>
            </h5>
          </span>
        </p>
        <span>
          <span onClick={handlePlay}>
            {isPlaying ? (
              <FaPlay className="play" />
            ) : (
              <FaPause className="pause" />
            )}
          </span>
          <span className="controls-mute show-pause">
            <GoUnmute />
          </span>
          {currentUser.id === story.userId ? (
            <p>
              <FiMoreHorizontal
                onClick={() => setShowCanDelete(!showCanDelete)}
              />
              {showCanDelete && (
                <div onClick={handleDelete}>
                  <h6>xóa</h6>
                </div>
              )}
            </p>
          ) : (
            <span></span>
          )}
        </span>
      </div>
    </div>
  );
}

export default Video;
