
import Post from '../Post';
import './posts.scss';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../redux/actions/post';
function Posts({ownId}) {
  const {isLoading ,isError, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(getPosts());
  },[dispatch])
    return ( 
        <>
        {isLoading ? "Loading..." : 
        <div className="posts">
              {ownId ? 
              posts.filter(post => post.userId === ownId).map((post,index) => (
                <Post  post={post} key={index} /> 
              ))
              
              : posts.map((post,index )=> {
               return  <Post  post={post} key={index} /> 
                  
              })}  
        </div>
        }
          
        </>
       
     );
}

export default Posts;