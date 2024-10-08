export const isLoggedIn  = (req , res , next)=>{

    // console.log("current path : " , req.path , " AND originalUrl : " , req.originalUrl);

    //req.isAuthenticated() is added by passport. Checks whether the user is authenticated or not.
    //logging in is done by passport.authenticate("local" , options) which is implemented in user controller.
    //passport.authenticate("local" , options) adds req.user to the request object and in session
    if(!req.isAuthenticated()){
        res.status(401).json({message:"you are not authorized , unauthorized"})
        return 
    }
    next()
}
