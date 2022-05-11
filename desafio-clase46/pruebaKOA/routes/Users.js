import Router from "koa-router";

const router = new Router({
    prefix:"/users"
})

let users = [
    {id:1,first_name:'Gonzalo',last_name:"Signanini"},
    {id:2,first_name:'Roberto',last_name:"Sanchez"},
    {id:3,first_name:'Juan',last_name:"Perez"},
    {id:4,first_name:'Rodrigo',last_name:"Ortega"},
    {id:5,first_name:'Marcela',last_name:"Cabrera"}
]

router.get('/',context=>{
    context.body={
        status:'success',
        users
    }
})

router.get('/:id', context=> {
    const currentUser = users.find(user => user.id === parseInt(context.params.id))
    if(currentUser) {
        context.body={
            currentUser
        }
    }else{
        context.response.status = 404
        context.body={
            status:'Error',
            error:'not found'
        }
    }
})

router.post('/', context=>{
    let {first_name,last_name} = context.request.body
    //create user
})

export default router