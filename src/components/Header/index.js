import "./header.scss";

import { BsSearch } from "react-icons/bs";
import { AiFillHome,  } from "react-icons/ai";
import { RiYoutubeLine,  RiGovernmentLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TiThMenu } from "react-icons/ti";
import { CgGames } from "react-icons/cg";
import { Link } from "react-router-dom";
//-------My import
import TextHover from "./TextHover";
import { routesPublic } from "../../config/routes";
import HeaderRight from "./HeaderRight";
import LoadingSkeleton from "../LoadingSkeleton";
import { useEffect, useState } from "react";
let isFirstLoading = true;
function Header() {
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false)
      isFirstLoading = false;
    },(4 * 1000))
  },[])
  return (
    <div className="header">
      <Link to={routesPublic.home} className="header__left">
      <span className="header__left__logo" >
      {skeleton && isFirstLoading ? <LoadingSkeleton circle="true" /> :     <img src="/logo.png" alt="facebook" />}
        
      </span>
      
        <div className="header__left__search">
        {skeleton && isFirstLoading ? <LoadingSkeleton /> :      <>
         <BsSearch />
          <input
            type="text"
            name="search"
            placeholder="Tìm kiểm trên Facebook"
          />
         </>}
       
        </div>
        <div className="header__left__search mobile-display screen-large-992-none">
          <TiThMenu />
        </div>
      </Link>
      <div className="header__center">
      {skeleton && isFirstLoading ? <>
        <LoadingSkeleton count={1}/> <LoadingSkeleton /> 
        <LoadingSkeleton /> <LoadingSkeleton />
      </> : <>

      <Link to={routesPublic.home} className="header__center__icon select">

<AiFillHome />
<TextHover text={"Trang chủ"} />{" "}


</Link>
<span className="header__center__icon">
{" "}
<RiYoutubeLine />
<TextHover text={"Watch"} />
</span>
<Link to="" className="header__center__icon">
{" "}
<RiGovernmentLine />
<TextHover text={"Marketplace"} />
</Link>
<Link to="" className="header__center__icon">
{" "}
<HiOutlineUserGroup />
<TextHover text={"Nhóm"} />
</Link>
<Link to="" className="header__center__icon">
{" "}
<CgGames />
<TextHover text={"Trò chơi"} />
</Link>
      </> }
      
      </div>
       <HeaderRight />
    </div>
  );
}

export default Header;
