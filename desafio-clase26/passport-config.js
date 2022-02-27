import passport from "passport";
import fbStrategy from "passport-facebook"
import { UserModel } from "./dao/models/User.js";

const FacebookStrategy = fbStrategy.Strategy

const initializePassportConfig = ()=> {
    passport.use('facebook', new FacebookStrategy({
        clientID:'699454348098278',
        clientSecret:'305dc108ae066fb394de22f921677d58',
        callbackURL:'http://localhost:8080/auth/facebook/callback',
        profileFields:['emails']
    },async (accessToken, refreshToken, profile, done)=>{
        try{
            console.log(accessToken)
            console.log(profile)
            let user = await UserModel.findOne({email:profile.emails[0].value})
            done(null,user)
        }catch(error){
            done(error)
        }

    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        users.findById(id,done);
    })
}


export default initializePassportConfig