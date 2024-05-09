import User from '../Model/user-schema.js';

export const userSignup=async(req,res)=>{     //req comes from frontend &response we are sending
    try{
         //console.log(req.body);
        const exist=await User.findOne({username: req.body.username});
         if (exist) {
             return res.status(401).json({message:'Username already exist'});
         }
        const user=req.body;
         const newUser=new User(user);
        await newUser.save();

        res.status(200).json({message:user});   // (this is required response which we sending to frontend)

    }catch(error){
         res.status(500).json({message:error.message});   //internal server error
    }
}

export const userLogin=async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;

        let user=await User.findOne({username:username,password:password});
        if(user){
            return res.status(200).json({data:user});
        }else{
            return res.status(401).json('Invalid login');
        }

    }catch(error){
        res.status(500).json({'Error':error.message});
    }
}

  