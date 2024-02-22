import express from "express";
import usersRoter from "./routes/users.mjs";
import productsRoter from "./routes/products.mjs"


const app = express();

app.use(express.json());
app.use(usersRoter);
app.use(productsRoter);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT}`);
});

app.get('/', (req, res) => {
    res.cookie("Hello", "World", { maxAge: 6000 });
    res.status(200).send("Hello express !");
});