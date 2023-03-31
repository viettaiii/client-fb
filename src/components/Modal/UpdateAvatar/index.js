import { forwardRef, useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdClose, MdDriveFileRenameOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import httpsRequest from "../../../api/axios";
import { UserContext } from "../../../context/authContext";
import { useFirstGoToPage } from "../../../hooks/useFirstGoToPage";
import { updateUser } from "../../../redux/actions/user";
import LoadingSkeleton from "../../LoadingSkeleton";
import Spinner from "../Spinner";




const UpdateAvatar = forwardRef(( {setShowModalUpdateAvatar} ,ref) => {

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
  });
  const skeleton = useFirstGoToPage();
  const [profilePic, setProfilePic] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userProfile);
  const { update } = useContext(UserContext);
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await httpsRequest.post("/api/upload", formData);
      return data.file;
    } catch (e) {
      console.log("Error", e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newProfile = userProfile;
    if (!e.target.classList.contains("disabled")) {
      if (profilePic) {
        const newProfilePic = await handleFile(profilePic);
        newProfile.profilePic = newProfilePic;
      }
      setProfilePic(null);
      if (inputs.firstName) {
        newProfile.firstName = inputs.firstName;
      }
      if (inputs.lastName) {
        newProfile.lastName = inputs.lastName;
      }
      setShowSpinner(true);
      setTimeout(async () => {
        await dispatch(updateUser(newProfile));
        await update(newProfile);
        setShowModalUpdateAvatar(false);
        setShowSpinner(false);
        inputs.firstName = "";
        inputs.lastName = "";
      }, 3 * 1000);
    }
  };
 
  return (
    <div className="modal-update-avatar">
      <div className="modal-update-avatar__wrapper" ref={ref}>
      {skeleton  ? (
            <LoadingSkeleton height={"200px"} width="100%" />
          ) :
          <>
       
        <div className="modal-update-avatar__wrapper__top">
         
            <>
              <h3>Cập nhật ảnh đại diện</h3>
              <span onClick={() => setShowModalUpdateAvatar(false)}>
                <MdClose />
              </span>
            </>
         
        </div>
        <form id="form-avatar" method="POST">
          <div className="modal-update-avatar__wrapper__info">
            <span className="modal-update-avatar__wrapper__info__one">
              <label
                htmlFor="id-avatar"
                className="modal-update-avatar__wrapper__info__one__title"
              >
                <IoMdAdd />
                Avatar
              </label>
              <input
                id="id-avatar"
                hidden
                type="file"
                name="profilePic"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
              {profilePic ? (
                <img src={URL.createObjectURL(profilePic)} alt="" />
              ) : (
                ""
              )}
            </span>

            <span className="modal-update-avatar__wrapper__info__one">
              <h5
                className="modal-update-avatar__wrapper__info__one__title"
                onClick={() => setShowEditName(!showEditName)}
              >
                <MdDriveFileRenameOutline />
                Name
              </h5>
              {showEditName && (
                <>
                  <input
                    type="text"
                    placeholder="Họ"
                    name="lastName"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Tên"
                    name="firstName"
                    onChange={handleChange}
                  />
                </>
              )}
            </span>
            <button
              onClick={handleSubmit}
              className={`modal-update-avatar__wrapper__save ${
                !(inputs.firstName || inputs.lastName || profilePic)
                  ? "disabled"
                  : ""
              } `}
            >
              Thay đổi
            </button>
          </div>
        </form>
        {showSpinner && <Spinner coverPic={true} />}

          </>}
      </div>
    </div>
  );
})

export default UpdateAvatar;
