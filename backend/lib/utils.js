const jwt = require("jsonwebtoken")
function authenticationToken(req, res){
    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.split("")[1]
    if(!token) return res.sendStatus(401)

        jwt.verify(token, process.env.)
}