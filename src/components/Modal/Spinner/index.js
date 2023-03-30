import PropTypes from "prop-types";
import './spinner.scss';

function Spinner({coverPic}) {
    
    return ( 
            <div className={`spinner-model ${coverPic ?"cover-pic" : ""}`}  >

<div className="lds-facebook"><div></div><div></div><div></div></div>

            </div>
     );
}
Spinner.propTypes ={
    coverPic : PropTypes.bool
}
export default Spinner;