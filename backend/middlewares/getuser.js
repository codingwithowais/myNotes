var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Ushi is a good boy'

const fetchUser = (req, res , next)=>{
    try{

        const token = req.header('jwtToken');
        if(!token){
            return res.status(401).send({error:'Please enter a valid token'})
        }
        let data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
       return res.status(401).send({error:'Please enter a valid token'})
    }
}
module.exports = fetchUser;