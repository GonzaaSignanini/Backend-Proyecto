import TODOS from "./TODOS.js";
import assert from 'assert'

describe('Pruebas de TODOS', ()=>{//bloque de testing
    it('Si instancío la clase TODOS, debe estar vacía', ()=>{
        const todos = new TODOS()
        assert.strictEqual(todos.list().length, 0)
    })
    it('Debe agregarse un TODO correctamente', ()=>{
        const todos =  new TODOS()
        todos.add('task1')
        assert.strictEqual(todos.list().length, 1)
    })
    it('al crear un TODO debe crearse sin completarse',()=>{
        const todos = new TODOS()
        todos.add('task1')
        assert.strictEqual(todos.list().length,1)
        assert.deepStrictEqual(todos.list(),[{title:'task1',completed:false}])
    })
})

describe('Errores en TODOS',()=>{
    it('Debe arrojar un error si no tengo tareas al querer completar',()=>{
        const todos = new TODOS()
        const excepted = new Error('No tasks')
        assert.throws(()=>{
            todos.completeTodo('asasasfasf')
        }, excepted )
    })
})