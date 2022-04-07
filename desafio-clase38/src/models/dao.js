export default class Dao{
    constructor(){
        this.models = {
            users:[],
            carts:[],
        }
    }
    getAll = async(model) => {
        if(!this.models[model]) throw new Error('Model not defined in dao')
        return this.models[model]
    }
    getById = async(id,model)=>{
        if(!this.models[model]) throw new Error('Model not defined in dao')
        let element = this.models[model].find(val=>val.id=id)
        return element
    }
    save = async(element,model)=>{
        if(!this.models[model]) throw new Error('Model not defined in dao')
        this.models[model].push(element)
    }

}