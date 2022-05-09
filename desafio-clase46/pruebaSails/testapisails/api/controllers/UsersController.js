/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  sayHello:(req,res)=>{
      res.send("Hola")
  },

  muestraBody:(req,res)=>{
      res.send(req.body)
  }
};

