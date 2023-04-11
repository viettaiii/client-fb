import {createContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../redux/actions/conversation';
import { getNotifications } from '../redux/actions/notification';
import { getStories } from '../redux/actions/story';
import { getUsers } from '../redux/actions/user';
export const StoreContext = createContext();
const ProviderStore = ({children}) => {
    const { stories } = useSelector((state) => state.stories);
    const { conversations } = useSelector((state) => state.conversations);
    const { notifications } = useSelector((state) => state.notifications);
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getStories());
      dispatch(getConversations())
      dispatch(getNotifications())
      dispatch(getUsers());
    }, []);

    return (
        <StoreContext.Provider value={{stories ,conversations ,notifications ,users}}>
            {children}
        </StoreContext.Provider>
    )
}

export default ProviderStore;