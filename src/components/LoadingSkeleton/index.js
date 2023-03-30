
import Skeleton , { SkeletonTheme }from  'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './loading-skeleton.scss';
function LoadingSkeleton({circle , count ,height ,width}) {
    return (  
        <SkeletonTheme highlightColor="#4444441f">
        <div className='loading-wrapper' >
            <Skeleton count={count || 1}   height={height} width={width} duration={1} direction={"ltr"} circle={circle}/>
        </div>
        </SkeletonTheme>
    );
}

export default LoadingSkeleton;