import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next)=>{
    const {token} = req.headers;
    // console.log(typeof(token));
    // console.log('Token:', token);
    if(!token){
        return res.json({success:false  , message:'Unauthorized request tkoen in auth.js'});
    }
    
    try {
        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;

        }
        else{
            return res.json({success:false  , message:"Unauthorized login again"});
        }

        next();

    } catch (error) {
        return res.json({success:false  , message:error.message});
    }
}


export default userAuth;