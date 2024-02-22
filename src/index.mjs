import express from "express";
import router from "./routes/router.mjs";


const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Runing on Port ${ PORT }`);
});

app.get('/', (req, res) => {
    res.cookie("Hello", "World", { maxAge: 60000 });
    res.status(200).send("Hello express !");
});

app.get('/api', (req, res) => {
    res.redirect("/");
});