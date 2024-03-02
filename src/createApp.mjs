import express from "express";
import router from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import "./stratagies/local-stratagy.mjs"
// import "../stratagies/discord-stratagy.mjs"


export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser('secret'));
    app.use(session({ 
        secret: 'xyz456',
        // This will worck only user do enything 
        // if this will true then session will set for all users for wisitin site
        saveUninitialized: false,
        resave: true,
        cookie: {
            maxAge: 60000 * 60
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router);


    return app;
}