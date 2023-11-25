import jwt from "jsonwebtoken"

export default async function Auth(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user = decodedToken
        res.json(decodedToken)
    } catch (error) {
        res.status(401).json({error : "Authentication Failed!"})
    }
}