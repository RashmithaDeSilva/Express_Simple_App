import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../db/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try{
        const findUser = User.findById(id);
        if(!findUser) throw new Error('User Not Found !');
        done(null, findUser);

    } catch(e) {
        done(e, null);
    }
});

export default passport.use(
    new Strategy(async (username, password, done) => {
        try{
            // const findUser = users.find((u) => u.username === username);
            // if(!findUser) throw new Error('User Not Found !');
            // if(findUser.password !== password) throw new Error('Invalid Credentials !');
            // done(null, findUser);

            const findUser = await User.findOne({ username });
            if(!findUser) throw new Error('User Not Found !');
            if(findUser.password !== password) throw new Error('Invalid Credentials !');
            done(null, findUser);

        } catch(e) {
            done(e, null);
        }
    })
);