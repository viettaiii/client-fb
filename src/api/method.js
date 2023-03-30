
import httpsRequest from "./axios";


// GET users/find/:userId
export const getUserAxios = async (userId) =>  {
    try {
        const {data} = await httpsRequest.get('/api/users/find/' +userId);
       return data;
   }catch(e) {
       console.log("Error" , e);
   }
}

export const getMessagesAxios = async (conversationId) => {
    try {
        const {data} = await httpsRequest.get('/api/messenges/' + conversationId);
        return data;
    }catch(e) {
        console.log(e);
    }
}


