import Video from "../Video";

import { Navigation, Pagination  } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import LoadingSkeleton from "../LoadingSkeleton";
import { useFirstGoToPage } from "../../hooks/useFirstGoToPage";
 function Videos({ stories ,idShow ,handleChangeSlide,setIdShow ,thumbsSwiper }) {
  const skeleton = useFirstGoToPage();
 
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
      { skeleton ? <LoadingSkeleton /> : <Video
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
