import axios from "axios";

axios('http://localhost:8080/testget')
.then(result =>{
    console.log(result.data)
})

axios.get('http://localhost:8080/testget',{
    params:{//se accede por req.query
        ID:123456
    }
})

axios('http://localhost:8080/testget',{
    method:'POST',
    data:{//se accede por req.body
        first_name:"Ernesto",
        last_name:"Aurelio"
    }
})
.then(result=>{
    console.log(result.data)
})