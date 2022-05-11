import {Response,Request,Context,helpers} from "https://deno.land/x/oak/mod.ts";
import db from '../db/mongodb.ts'
const userCollection = db.collection('users')

const users = [
    {id:1,first_name:"Matias",last_name:"Urbao"},
    {id:2,first_name:"ass",last_name:"asd"}
]


export const getAllUsers = async (context:Context)=>{
    const users = await userCollection.find().toArray()
    context.response.body={
        payload:users
    }
    // context.response.body={
    //     payload:users
    // }
}

export const saveUser = async ({request,response}:{request:Request,response:Response})=>{
    const body = await request.body()
    const values = await body.value
    console.log(values)
    response.body= values

}

export const getUsersById = (context:Context)=>{
    const {id} = helpers.getQuery(context,{mergeParams:true})
    context.response.body = id
}

export const getQuery = ({request,response}:{request:Request,response:Response}) => {
    const query = request.url.searchParams.get('uid')
    console.log(query)
    response.body=query
}