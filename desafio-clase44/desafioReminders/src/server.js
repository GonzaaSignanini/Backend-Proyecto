import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import reminder from './Reminders.js'

const app = express()

const schema = buildSchema(`
    type Reminder{
        id:Int
        title:String
        description:String
        status:String
    }
    type Query{
        getReminders:[Reminder]
    }
    type Mutation{
        createReminder(title:String,description:String): Reminder
        deleteReminders:[Reminder]
        completeReminder(id:Int): [Reminder]
    }
`)

app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:{
        getReminders:()=> reminder.getRemainder(),
        createReminder:(data)=>reminder.createReminder(data),
        deleteReminders:()=>reminder.deleteReminders(),
        completeReminder:(id)=>reminder.completeReminder(id)
    },
    graphiql:true
}))

const server = app.listen(8080,()=>console.log('escuchando'))