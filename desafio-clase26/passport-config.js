import passport from "passport";
import fbStrategy from "passport-facebook"
import { UserModel } from "./dao/models/User.js";

const FacebookStrategy = fbStrategy.Strategy

const initializePassportConfig = ()=> {
    passport.use('facebook', new FacebookStrategy({
        clientID:'492620022217237',
        clientSecret:'e34c81ff68e354b6ae99f2f4b0b3894a',
        callbackURL:'https://e831-190-189-178-112.ngrok.io/auth/facebook/callback',
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