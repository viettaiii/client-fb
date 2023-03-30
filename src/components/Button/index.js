

import './button.scss';
function Button({btnConfirm , btnReject , text ,onClick}) {
    const btnClasses = []

    if(btnConfirm) {
        btnClasses.push("btns__confirm");
    }
    if(btnReject) {
        btnClasses.push("btns__reject");
    }
    return ( 
        <button className={[...btnClasses]} onClick={onClick} >{text}</button>
     );
}

export default Button;