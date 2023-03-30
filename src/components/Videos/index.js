import Video from "../Video";

import { Navigation, Pagination  } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton";
const isFirstLoading = true;
function Videos({ stories ,idShow ,handleChangeSlide,setIdShow ,thumbsSwiper }) {
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
      isFirstLoading = false;
    }, 4 * 1000);
  }, []);
  return (
    <Swiper
    direction={"vertical"}
    grabCursor={true}
    slidesPerView={1}
    thums={{swiper : thumbsSwiper }}
    modules={[Navigation, Pagination]}
    activeIndex={idShow}
    navigation = {{
      nextEl :  '.swiper-button-next',
      prevEl : '.swiper-button-prev',
    }}
    scrollbar={{ draggable: true }}
    onSlideChange={handleChangeSlide}
    className='show-story__right__videos'
  >
    {stories.map((story, index) => (
      <SwiperSlide key={index}>
      {isFirstLoading && skeleton ? <LoadingSkeleton /> : <Video
            story={story} setIdShow={setIdShow}  idShow={idShow}
          />}
      </SwiperSlide>
    ))}
  
    <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    
    
  </Swiper>
    
  );
}

export default Videos;
