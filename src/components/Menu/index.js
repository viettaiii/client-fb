import { forwardRef } from "react";

import {AiFillFolderAdd, AiOutlineSearch} from 'react-icons/ai';
import {BsArrowDownLeftCircleFill, BsCameraVideoFill, BsFillHandbagFill, BsFlagFill} from 'react-icons/bs';
import {FaBookOpen} from 'react-icons/fa';
import {TbSpeakerphone} from 'react-icons/tb';
import {HiUserGroup} from 'react-icons/hi';
import './menu.scss';
import {society , entertainment, shopping, personal, profession, publicPower, otherProduct} from '../../assets/data-menu';
const Menu = forwardRef((props, ref) => {
    
    return (
        <>
        <div className="menu" ref={ref}>
            <div className="menu__left">
                <div className="menu__left__search">
                  <AiOutlineSearch className="menu__left__search__icon"/>  <input type="text" placeholder="Tìm kiếm trong menu"/>
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Xã hội</span>
                    {society.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Giải trí</span>
                    {entertainment.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Giải trí</span>
                    {shopping.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Giải trí</span>
                    {personal.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Giải trí</span>
                    {profession.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Giải trí</span>
                    {publicPower.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
                <div className="menu__left__items">
                    <span className="menu__left__items__title">Giải trí</span>
                    {otherProduct.map((item,index) => (

                    <div  key={index} className="menu__left__items__item">
                            <img src={item.image} alt="" />
                            <div className="menu__left__items__item__text">
                                <span className="menu__left__items__item__text__name">{item.name}</span>
                                <span className="menu__left__items__item__text__desc">{item.text}</span>
                            </div>
                    </div>

                    ))}
                    
                </div>
            </div>

            <div className="menu__right">
                        <span className="menu__right__header">Tạo</span>
                <div className="menu__right__items">
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <BsArrowDownLeftCircleFill/>
                                </span>
                                <span className="menu__right__items__item__title">
                                       Đăng
                                </span>
                            </div>
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <FaBookOpen/>
                                </span>
                                <span className="menu__right__items__item__title">
                                       Tin
                                </span>
                            </div>
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <BsCameraVideoFill/>
                                </span>
                                <span className="menu__right__items__item__title">
                                       Phòng họp mặt
                                </span>
                            </div>
                </div>
                <div className="menu__right__items">
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <BsFlagFill/>
                                </span>
                                <span className="menu__right__items__item__title">
                                      Trang
                                </span>
                            </div>
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <TbSpeakerphone/>
                                </span>
                                <span className="menu__right__items__item__title">
                                       Quảng cáo
                                </span>
                            </div>
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <HiUserGroup/>
                                </span>
                                <span className="menu__right__items__item__title">
                                      Nhóm
                                </span>
                            </div>
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <AiFillFolderAdd/>
                                </span>
                                <span className="menu__right__items__item__title">
                                     Sự kiện
                                </span>
                            </div>
                            <div className="menu__right__items__item">
                                <span className="menu__right__items__item__icon">
                                        <BsFillHandbagFill/>
                                </span>
                                <span className="menu__right__items__item__title">
                                     Bài niêm yết trên Marketplace
                                </span>
                            </div>
                </div>
            </div>
        </div>
        </>
    )
})

export default Menu;