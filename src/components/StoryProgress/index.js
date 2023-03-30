import { forwardRef, useEffect, useRef } from "react";


const StoryProgress = forwardRef(({setIsPlaying} , videoRef) => {
    const progressRef = useRef();
    useEffect(() => {
        const video = videoRef.current;
        const progress = progressRef.current;
        function updateProgress() {
            let percent = (video.currentTime * 100 / video.duration) ;
            progress.style.width = percent+"%";
            if(percent >= 100) {
                setIsPlaying(true);
                setTimeout(() => {
                    setIsPlaying(false);
                    video.play();
                    percent = 0 ;
                },(1000))
            }
        }
        video.addEventListener('timeupdate', updateProgress
        )
        return ( ) => {
            video.removeEventListener('timeupdate',updateProgress)
        }
        
    },[videoRef])
    return (
        <span ref={progressRef}></span>
    )
})

export default StoryProgress;