import express from "express";
import router from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./stratagies/local-stratagy.mjs"


const app = express();

mongoose.connect('mongodb://192.168.8.139:27017/express_test')
    .then(() => console.log('Connected to Database'))
    .catch(e => console.log(`Error: ${ e } !`));

app.use(express.json());
app.use(cookieParser('secret'));
app.use(session({ 
    secret: 'xyz456',
    // This will worck only user do enything 
    // if this will true then session will set for all users for wisitin site
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Runing on Port ${ PORT }`);
});

app.get('/', (req, res) => {
    req.session.visited = true;
    // console.log(req.session);
    // console.log(req.session.id); 
    // res.cookie("key", "value", { maxAge: 60000 * 60, signed: true });
    res.status(200).send("Hello express !");
});

app.get('/api', (req, res) => {
    res.redirect("/");
});

// app.post('/api/auth', (req, res) => {
//     const { body: { username, password } } = req;
//     const user = users.find(u => u.username === username);

//     if(!user || user.password !== password) return res.status(404).send({ mgs: "BAD CREDENTIALS !" });
//     req.session.user = user;
//     return res.status(200).send(user);
// });

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

app.get('/api/auth/status', (req, res) => {
    console.log(req.user);
    return req.user 
        ? res.status(200).send(req.user) 
        : res.status(401).send({ mgs: "NOT AUTHENTICATED !" })
});

app.post('/api/auth/logout', (req, res) => {
    if(!req.user) return res.sendStatus(401);

    req.logOut(e => {
        if(e) return res.sendStatus(400);
        res.sendStatus(200);
    })
});

app.post('/api/cart', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);

    const { body: item } = req;
    const { cart } = req.session;

    if(cart) {
        cart.push(item);
    
    } else {
        req.session.cart = [item];
    }
    return res.status(201).send(item);
});

app.get('/api/cart', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    return res.send(req.session.cart ?? []);
});