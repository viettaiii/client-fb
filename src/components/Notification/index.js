
import {FiMoreHorizontal} from 'react-icons/fi';
import {BsFillCameraReelsFill} from 'react-icons/bs';
import {FaUserAlt} from 'react-icons/fa';
import { forwardRef } from 'react';



///My imports
import {newNotification , invitationNotification , afterNotification} from '../../assets/data-notification';
import './notification.scss';
import Button from '../Button';
const ComNotification = forwardRef((props, ref) => 
{
    return (  
        <div className="notifications" ref={ref}>
                <div className='notifications__header'>
                    <h2 >Thông báo</h2>
                    <span className='notifications__header__more-icon'>
                    <FiMoreHorizontal />
                    </span>
                </div>
                <div className='notifications__type'>
                    <span className='notifications__type__same select'>Tất cả</span>
                    <span className='notifications__type__same '>Chưa đọc</span>
                </div>
                <div className='notifications__same'>
                    <div className='notifications__same__header'>
                        <span className='notifications__same__header__title'>Mới</span>
                        <span className='notifications__same__header__see-all'>Xem tất cả</span>
                    </div>
                    <div className='notifications__items'>
                        <div className='notifications__items__item'>
                            <div className='notifications__items__item__image'>
                                <img src={newNotification[0].image}/>
                                <span className='notifications__items__item__image__icon'><BsFillCameraReelsFill/></span>
                            </div>
                            <div className='notifications__items__item__text'>
                                <p> <span className='notifications__items__item__text__name'>{newNotification[0].name}</span> đang phát trực tiếp: "{newNotification[0].message}"</p>
                                <span className='notifications__items__item__text__createdAt'>{newNotification[0].createdAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='notifications__same'>
                    <div className='notifications__same__header'>
                        <span className='notifications__same__header__title'>Lời mời kết bạn</span>
                        <span className='notifications__same__header__see-all'>Xem tất cả</span>
                    </div>
                    <div className='notifications__items'>
                        <div className='notifications__items__item'>
                            <div className='notifications__items__item__image'>
                                <img src={invitationNotification[0].image}/>
                                <span className='notifications__items__item__image__icon notifications__items__item__image__icon--user'><FaUserAlt/></span>
                            </div>
                            <div className='notifications__items__item__text'>
                                <p> <span className='notifications__items__item__text__name'>{invitationNotification[0].name}</span> đã gửi lời mời kết bạn cho bạn</p>
                                <span className='notifications__items__item__text__createdAt'>{invitationNotification[0].createdAt}</span>
                                <div className='btns'>
                                    <Button btnConfirm={true} text="Xác nhận"/>
                                    <Button btnReject={true} text="Xóa"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='notifications__same'>
                    <div className='notifications__same__header'>
                        <span className='notifications__same__header__title'>Trước đó</span>
                        <span className='notifications__same__header__see-all'>Xem tất cả</span>
                    </div>
                    <div className='notifications__items'>
                    {afterNotification.map((item,index) => (
                        <div key={index} className='notifications__items__item'>
                            <div className='notifications__items__item__image'>
                                <img src={item.image}/>
                                <span className='notifications__items__item__image__icon notifications__items__item__image__icon--user'>{item.icon}</span>
                            </div>
                            <div className='notifications__items__item__text'>
                                <p> <span className='notifications__items__item__text__name'>{item.name}</span> {item.message}</p>
                                <span className='notifications__items__item__text__createdAt'>{item.createdAt}</span>
                            </div>
                        </div>


                    ))}
                        
                    </div>
                </div>
        </div>
    );
});

export default ComNotification;