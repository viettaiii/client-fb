import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {images} from '../../../assets/data-avaliableCoverPic';
import LoadingSkeleton from "../../LoadingSkeleton";
import "./image-user.scss";
let isFirstLoading = true;
const ImageUser = forwardRef(({ setShowImageUser, setCoverPic  }, ref) => {
  const handleUrlToFile = (img) => {
    fetch(img)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'image', {type:blob.type})
      setCoverPic(file);
    })
  }
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false)
      isFirstLoading = false;
    },(4 * 1000))
  },[])
  return (
    <div className="modal-image-user">
      <div className="modal-image-user__wrapper" ref={ref}>
      {isFirstLoading && skeleton ? <LoadingSkeleton width={"100%"} height={"100%"} /> :
      <>
      <div className="modal-image-user__wrapper__top">
          <h4>Chọn ảnh</h4>
          <span onClick={() => setShowImageUser(false)}>
            <MdClose />
          </span>
        </div>
        <div className="modal-image-user__wrapper__images">
          {images.map((image, index) => (
            <span
              key={index}
              className="modal-image-user__wrapper__images__image"
              onClick={() => {
                handleUrlToFile(image)
              }}
            >
              <img alt="" src={image} />
            </span>
          ))}
        </div>
      </>
      }
       
      </div>
    </div>
  );
});
ImageUser.propTypes = {
  setShowImageUser: PropTypes.func,
};

export default ImageUser;
