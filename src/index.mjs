import express from "express";
import usersRoter from "./routes/users.mjs";


const app = express();
app.use(express.json());
app.use(usersRoter);
const PORT = process.env.PORT || 8000;


app.get('/', (req, res) => {
    res.status(200).send("Hello express !");
});

app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT}`);
});