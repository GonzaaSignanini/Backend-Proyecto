class Utils{
    static dateNow = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

    static authMiddleware = (req,res,next) => {
        if(!req.auth){
            res.status(403).send({error:-1, description:`Path ${req.originalUrl} with method ${req.method} are Not Authorized `})
            console.log(`Path ${req.originalUrl} with method ${req.method} are Not Authorized `)
        }else {
            next()
        }
    }
}

module.exports = Utils;