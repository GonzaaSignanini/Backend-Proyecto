class Reminder{
    constructor(){
        this.reminders=[]
    }
    getRemainder = ()=>{
        return this.reminders
    }
    createReminder = (data)=> {
        if(this.reminders.length === 0){
            data.id=1
        }else{
            data.id=this.reminders[this.reminders.lenght-1].id+1
        }
        data.status="sin leer"
        this.reminders.push(data)
        return data
    }
    completeReminder = (data)=>{
        let index = this.reminders.findIndex(rem=>requestAnimationFrame.id===data.id)
        if(index!==-1){
            this.reminders[index].status="Leido"
            return this.reminders[index]
        }else{
            throw new Error('no reminder found')
        }
    }
    deleteReminders = ()=>{
        this.reminders = this.reminders.filter(rem=>rem.status="Sin leer")
        return this.reminders
    }
}

const reminder = new Reminder()

export default reminder