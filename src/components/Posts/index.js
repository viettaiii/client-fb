
import Post from '../Post';

import './posts.scss';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../redux/actions/post';
function Posts() {
    const postReducer = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const {isLoading ,isError, posts } = postReducer;
    useEffect(() => {
            dispatch(getPosts());
    },[dispatch])
    return ( 
        <>
        {isLoading ? "Loading..." : 
        <div className="posts">
              {posts.map((post,index )=> (
                  <Post  post={post} key={index} />
              ))}  
        </div>
        }
          
        </>
       
     );
}

export default Posts;