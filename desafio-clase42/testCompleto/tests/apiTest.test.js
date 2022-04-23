import supertest from 'supertest'
import chai,{expect} from 'chai'

const request = supertest('http://localhost:8080')

describe('test de API',()=>{
    describe('GET',()=>{
        it('La peticion deberia retornar status 200', async()=>{
            let res = await request.get('/users')
            expect(res.status).to.equal(200)
        })
    })
    describe('POST',()=>{
        it('Debe poder guardar un usuario', async ()=>{
            let user = {
                first_name:'Franco',
                last_name:'Caners',
                email:'correo@correo.com'
            }
            let res = await request.post('/users').send(user)
            expect(res.status).to.be.equals(200)
            const resBody = res.body
            expect(resBody).to.include.keys('first_name','last_name','email','_id')
        })
    })
})