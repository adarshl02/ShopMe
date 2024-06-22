import axios from 'axios';
const URL='/api';         //our react app is on 3000 but but are routing to 8000/signup



export const authenticateSignup=async (data)=>{
    try{
        let response= await axios.post(`${URL}/signup`, data);
        return response;
    
             //frontend se data lekar uss par kuch operation perform karana
                                                        //
    }catch(error){
        console.log("Wrong data from frontends",error);
        return error.response;
    }
}

export const authenticateLogin=async (data)=>{
    try{
        
        let response= await axios.post(`${URL}/login`, data); 
        return response;
          //if giving response with 400 it breaks
               //frontend se data lekar uss par kuch operation perform karana
                                                        //
    }catch(error){
        console.log("Wrong data from frontend",error);
        return error.response;
    }
}

    export const addCartTodb=async(cartItems,userId)=>{
        
        try{
            const data={
                cartItems:cartItems,
                userId:userId
            }
            return await axios.put(`${URL}/cart`,data);
        }catch(error){
            console.log("Wrong data from frontend",error);
            return error.response;
        }
    }

    export const logout = async () => {

        try {
            const { data } = await axios.get(`${URL}/logout`, { withCredentials: true })
        } catch (error) {
            throw error
        }
    };

    export const CartToOrder=async(userId,cartItems)=>{
        try{
            const data={
                cartItems:cartItems,
                userId:userId
            }
            return await axios.put(`${URL}/cartToOrder`,data);
        }catch(error){
            console.log("Wrong data from frontend",error);
            return error.response;
        }
    }

