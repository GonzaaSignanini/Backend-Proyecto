export default class GenericQueries{
    constructor(dao,model){
        this.dao = dao
        this.model = model
    }
    get = async()=>{
        return this.dao.getAll(this.model)
    }
    getById= async(id)=>{
        return this.dao.getById(id,this.model)
    }
    save = async(element) => {
        return this.dao.save(element,this.model)
    }
}