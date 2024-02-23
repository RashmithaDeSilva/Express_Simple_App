import express from "express";
import router from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();

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
app.use(router);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Runing on Port ${ PORT }`);
});

app.get('/', (req, res) => {
    req.session.visited = true;
    console.log(req.session);
    console.log(req.session.id); 
    // res.cookie("key", "value", { maxAge: 60000 * 60, signed: true });
    res.status(200).send("Hello express !");
});

app.get('/api', (req, res) => {
    res.redirect("/");
});