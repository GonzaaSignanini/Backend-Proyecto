import { userDao } from "../models/Users.js";

export default class UserService{
    getUsers = async()=>{
        try{
            let result = await userDao.find()
            return result
        }
        catch(error){
            throw new Error('Cant get user')
        }
    }
    saveUser = async(user)=>{
        try{
            let result = await userDao.create(user)
            return result
        }catch(err){
            throw new Error('Cant save user')

        }
    }
}