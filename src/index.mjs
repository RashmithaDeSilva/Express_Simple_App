import express from "express";
import router from "./routes/router.mjs";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cookieParser('secret'));
app.use(router);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Runing on Port ${ PORT }`);
});

app.get('/', (req, res) => {
    // res.cookie("key", "value", { maxAge: 60000 * 60, signed: true });
    res.status(200).send("Hello express !");
});

app.get('/api', (req, res) => {
    res.redirect("/");
});