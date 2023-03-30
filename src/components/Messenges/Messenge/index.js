import Avatar from "../../Avatar";
import moment from 'moment';
import { useEffect, useRef } from "react";

function Messenge({own , mess }) {
    
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current.scrollIntoView({behavior :"smooth"});
    },[scrollRef])
    return ( 
      <>
           {mess && <div className={`messenges__bottom__contents__messenge ${own ? "own" : ""}`} ref={scrollRef}>
       <Avatar />
       <p className="messenges__bottom__contents__messenge__text">
       {mess.text}
       </p>
       <small>
       {moment(mess.createdAt).fromNow("mm")}
       </small>
   </div>} 
      </>
                
     );
}

export default Messenge;