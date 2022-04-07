import {userService} from '../services/services.js'

const getUsers = async(req,res)=>{
    let users = await userService.get()
    res.send(users)
}
const getUserById = async(req,res)=>{
    const id = parseInt(req.params.uid)
    let user = await userService.getById(id)
    res.send(user)
}
const saveUser = async(req,res)=>{
    let {first_name,last_name,email} = req.body
    if(!first_name||!last_name||!email)return res.send({error:"incomplete values"})
    let user = {
        first_name,last_name,email
    }
    let users = await userService.get()
    if(users.length >0){
        let id = users[users.length-1].id
        user.id=id
        await userService.save(user)
        res.send({user:user})
    }{
        user.id=1
        await userService.save(user)
        res.send({user:user})
    }
}

export default {
    getUsers,
    getUserById,
    saveUser,
}