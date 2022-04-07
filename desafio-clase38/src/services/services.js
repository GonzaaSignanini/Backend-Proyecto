import Dao from "../models/dao.js";
import UserService from "./users.js";
import CartsService from "./carts.js";

const dao = new Dao()

export const userService =  new UserService(dao)
export const cartsService =  new CartsService(dao)