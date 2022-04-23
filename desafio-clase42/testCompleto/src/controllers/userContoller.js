import UserService from "../services/userService.js";

const userService = new UserService()

const getUsers = async(req,res)=>{
    let result = await userService.getUsers()
    res.send(result)
}

const saveUser = async(req,res)=>{
    try{
        console.log(req.body)
        if(!first_name||!last_name||!email) throw new Error('Imcomplete Values')
        let result = await userService.saveUser({first_name,last_name,email})
        res.send(result)
    }catch(err){
        res.status(400).send({error:"Incomplete values"})
    }
}

export default {
    getUsers,
    saveUser
}