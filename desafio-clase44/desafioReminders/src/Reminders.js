class Reminder{
    constructor(){
        this.reminders=[]
    }
    getRemainder = ()=>{
        return this.reminders
    }
    createReminder = (data)=> {
        if(this.reminders.length === 0){
            data.id= 1
        } else {
            const { id } = this.reminders[this.reminders.length - 1]
            data.id = id + 1
        }
        data.status="Sin leer"
        this.reminders.push(data)
        return data
    }
    completeReminder = ({id})=>{
        const data = this.reminders.map((reminder) => {
            if (reminder.id === id) {
                reminder.status = 'Leido'
                return reminder
            }
        })
        return data
    }
    deleteReminders = ()=>{
        const data = this.reminders.filter((reminder) => {
            if (reminder.status == "Sin leer") {
                return reminder
            }
        })
        this.reminders = data
        return this.reminders
    }
}

const reminder = new Reminder()

export default reminder