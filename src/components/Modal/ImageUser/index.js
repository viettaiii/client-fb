import PropTypes from "prop-types";
import { forwardRef } from "react";
import { MdClose } from "react-icons/md";
import { images } from "../../../assets/data-avaliableCoverPic";
import { useFirstGoToPage } from "../../../hooks/useFirstGoToPage";
import LoadingSkeleton from "../../LoadingSkeleton";
import "./image-user.scss";
const ImageUser = forwardRef(({ setShowImageUser, setCoverPic }, ref) => {
  const skeleton = useFirstGoToPage();
  const handleUrlToFile = (img) => {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "image", { type: blob.type });
        setCoverPic(file);
      });
  };

  return (
    <div className="modal-image-user">
      <div className="modal-image-user__wrapper" ref={ref}>
        {skeleton ? (
          <LoadingSkeleton width={"100%"} height={"100%"} />
        ) : (
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
                    handleUrlToFile(image);
                  }}
                >
                  <img alt="" src={image} />
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});
ImageUser.propTypes = {
  setShowImageUser: PropTypes.func,
};

export default ImageUser;
