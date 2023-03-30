import EmojiPicker from "emoji-picker-react";
import { forwardRef } from "react";

import './emoji-picker.scss';
const CEmojiPicker = forwardRef(({handleEmoijClick } , ref) => {
    return ( 
       
         <div  ref={ref} className="emoij__picker">
        <EmojiPicker height={300} onEmojiClick={handleEmoijClick} width={400} />
        </div> 
     );


}) ;

export default CEmojiPicker;