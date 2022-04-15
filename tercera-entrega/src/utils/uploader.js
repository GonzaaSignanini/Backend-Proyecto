import multer from 'multer'
import __dirname from '../utilsDirname.js'
import config from '../config/config.js'

export const uploader = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, __dirname+'/public/avatars')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
        }
    })
})