import http from 'http'
import fs from 'fs'

/*GET*/

// const options = {
//     hostname:'localhost',
//     port:8080,
//     path:'/testget',
//     method:'GET'
// }
// const req = http.request(options,(res)=>{
//     res.on('data', data => {
//         process.stdout.write(data)
//     })
// })

// req.end() 


/*DESAFIO*/

const options ={
    hostname:"jsonplaceholder.typicode.com",
    port:80,
    path:'/posts',
    method:'GET'
}

const req = http.request(options,res=>{
    res.setEncoding('binary');
    let data = [];
    res.on('data',stream=>{
        data.push(Buffer.from(stream,'binary'))
    })
    res.on('end',()=>{
        let binary = Buffer.concat(data);
        fs.writeFileSync('./httptest.json',binary.toString('binary'))
    })
})

req.end();
