import GenericQueries from "./GenericQueris.js";

export default class CartsService extends GenericQueries{
    constructor(dao){
        super(dao,'carts')
    }
}