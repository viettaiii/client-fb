import PropTypes from "prop-types";
import { forwardRef } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './model-success.scss';

const ModelSuccess= forwardRef(({message ,handleClick} , ref) => {
    return ( 
        <div className="success-message" >
            <span ref={ref}>
                <span> {message} <b><AiOutlineCheckCircle/></b></span>
            <button onClick={handleClick}>Nhấn vào tôi để <b>đăng nhập</b> nào bạn tui</button>
            </span>
        </div>
     
     );


})
ModelSuccess.propTypes = {
    message : PropTypes.string ,
    handleClick : PropTypes.func
}
export default ModelSuccess;