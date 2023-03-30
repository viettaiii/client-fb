import { AiFillQuestionCircle, AiOutlineMenuFold, AiTwotoneLock, AiTwotoneMail, AiTwotoneSetting } from "react-icons/ai";
import { BsChevronCompactRight } from "react-icons/bs";
import { Fa500Px, FaMoon, FaUserLock } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoIosHelpCircle } from "react-icons/io";
import { RiFolderWarningFill, RiLogoutBoxRFill, RiNewspaperFill } from "react-icons/ri";

export const accountFutures = [
    
    { text: "Cài đặt & quyền riêng tư" , icon: <AiTwotoneSetting/> ,iconRight: <BsChevronCompactRight/>},
    { text: "Trợ giúp & hỗ trợ" , icon: <IoIosHelpCircle/> ,iconRight: <BsChevronCompactRight/>},
    { text: "Màn hình & trợ năng" , icon: <FaMoon/> ,iconRight: <BsChevronCompactRight/>},
    { text: "Đóng góp ý kiến" , icon: <RiFolderWarningFill/>},
    { text: "Đăng xuất" , icon: <RiLogoutBoxRFill/>}
];

export const settingFutures = [
    
    { text: "Cài đặt & quyền riêng tư" , icon: <AiTwotoneSetting/> },
    { text: "Kiểm tra quyền riêng tư" , icon:<AiTwotoneLock/>},
    { text: "Trung tâm quyền riêng tư" , icon: <FaUserLock/> },
    { text: "Nhật kí hoạt động" , icon: <AiOutlineMenuFold/>},
    { text: "Tùy chọn bảng Feed" , icon: <RiNewspaperFill/>}, 
    { text: "Ngôn ngữ" , icon: <GrLanguage/>}
];

export const heplerFutures = [
    
    { text: "Trung tâm hỗ trợ" , icon: <AiFillQuestionCircle/> },
    { text: "Hộp thư hỗ trợ" , icon:<AiTwotoneMail/>},
    { text: "Báo cáo sự cố" , icon: <RiFolderWarningFill/> },
   
];

export const screenFutures = [
    
    { text: "Chế độ tối" , icon: <FaMoon/> , message:"Điều chỉnh giao diện của Facebook để giảm độ chói và cho đôi mắt được nghỉ ngơi." },
    { text: "Chế độ thu gọn" , icon:<Fa500Px/>, message:"Làm giảm kích thước phông chữ để có thêm nội dung vừa với màn hình."},
];
