import GenericQueries from "./GenericQueris.js";

export default class UserService extends GenericQueries{
    constructor(dao){
        super(dao,'users')
    }
    registerUserAlgo = async ()=>{
        let array = this.dao['users']//ejemplo de como hacer métodos especiales para cada servicio
        console.log(array)
    }
}