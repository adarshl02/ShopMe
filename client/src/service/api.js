import axios from 'axios';
const URL='/api';         //our react app is on 3000 but but are routing to 8000/signup

export const authenticateSignup=async (data)=>{
    try{
        return await axios.post(`${URL}/signup`, data);
             //frontend se data lekar uss par kuch operation perform karana
                                                        //
    }catch(error){
        console.log("Wrong data from frontend",error);
        return error.response;
    }
}

export const authenticateLogin=async (data)=>{
    try{
        return await axios.post(`${URL}/login`, data);   //if giving response with 400 it breaks
               //frontend se data lekar uss par kuch operation perform karana
                                                        //
    }catch(error){
        console.log("Wrong data from frontend",error);
        return error.response;
    }
}

//paytm
export const payUsingPaytm=async(data)=>{
    try{
        let response=await axios.post(`${URL}/payment`,data);
        return response.data;

    }catch(err){
        console.log('Error while calling payment api : ', err);
    }
}