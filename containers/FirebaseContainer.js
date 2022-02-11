const admin = require('firebase-admin');
const config = require('../config/config.js')
const serviceAccount = require('../daos/db/proyecto-backend-10ae8-firebase-adminsdk-naiww-96db8d142c.json')

admin.initializeApp({
        credential:admin.credential.cert(serviceAccount),
        databaseURL: config.fireBase.baseUrl
    })

class FirebaseContainer {
    constructor(query){
        this.query = query
    }
    getAll = async() => {
        try{
            const data = await this.query.get()
            const documents = data.docs
            const formatDocs = documents.map(document => document.data())
            return {status:"success", payload:formatDocs}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async getById(idNumber){
        try{
            const doc = this.query.doc(idNumber)
            let document = await doc.get()
            if(document.data()){
                return {status:"success", payload: document.data()}
            }else{
                console.log(null)
                return {status:"error", error: 'Object not found'}
            }
        }
        catch(err){
            return{status:"error", error:`Can't get entity with id:${idNumber} on ${this.url} - ${err}`}
        }
    }

    async deleteById(idNumber){
        try{
            const doc = this.query.doc(idNumber)
            await doc.delete()
            return { status: 'success', message:`objetct with id:${idNumber} was deleted`}
        }
        catch(err){
            return{status:"error", mesagge:`objetct with id:${idNumber} wasn't deleted - ${err}`}
        }
    }

    async deleteAll(){
        try{
            this.query.get().then( result => {
                result.forEach(el => {
                    el.ref.delete()
                })
            }
                
            )
            
            return{status:"success", mesagge:`all objects deleted`}
        }
        catch(err){
            return{status:"error", mesagge:`couldn't delete all objects - ${err}`}
        }
    }
}

module.exports = FirebaseContainer;