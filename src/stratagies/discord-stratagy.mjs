import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord-users.mjs";


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const findUser = await DiscordUser.findById(id);
        return findUser ? done(null, findUser) : done(null, null);

    } catch(e) {
        done(e, null);
    }
});

export default passport.use(new Strategy({
    clientID: "CLIENT ID",
    clientSecret: "CLIENT SECRET",
    callbackURL: "http://localhost:5000/api/auth/discord/redirect",
    scope: ["identify"], // 'guilds', 'email'

    }, async (accessToken, refreshToken, profile, done) => {

        let findUser;
        try {
            findUser = await DiscordUser.findOne({ discordId: profile.id });
        } catch(e) {
            return done(e, null);
        }

        try {
            if(!findUser) {
                const newUser = new DiscordUser({ 
                    username: profile.username,
                    discordId: profile.id,
                });

                const newSaveUser = await newUser.save();
                return done(null, newSaveUser);
            }
            return done(null, findUser);

        } catch(e) {
            return done(e, null);
        }
    }
))