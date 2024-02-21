import express from "express";
import usersRoter from "./routes/users.mjs";


const app = express();
app.use(express.json());
app.use(usersRoter);
const PORT = process.env.PORT || 8000;
const admin = [{ id: 1, username: "admin", contactnuber: 947987654321, email: "admin@gmail.com" }];
const users = [
    { id: 1, username: "alen", contactnuber: 94712345689, email: "alen@gmail.com" },
    { id: 2, username: "jone", contactnuber: 94712345689, email: "jone@gmail.com" },
    { id: 3, username: "same", contactnuber: 94712345689, email: "same@gmail.com" },
    { id: 4, username: "smith", contactnuber: 94712345689, email: "smith@gmail.com" },
    { id: 5, username: "alisa", contactnuber: 94712345689, email: "alisa@gmail.com" },
];
const loggingMiddleware = (req, res, next) => {
    
    next();
};
const resolveIndexByUserId = (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIndex = users.findIndex((u) => u.id === parsedId);
    if(userIndex === -1) return res.sendStatus(404);

    req.userIndex = userIndex;
    next();
};
// app.use(loggingMiddleware); // user for globely


app.get('/', (req, res) => {
    res.status(200).send("Hello express !");
});

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    return res.send(users[userIndex]);
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    users[userIndex] = { id: users[userIndex].id, ...body }
    return res.status(204).send({ msg: "Successfully update user", body });
});

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    users[userIndex] = { ...users[userIndex], ...body }
    return res.status(204).send({ msg: "Successfully update user", body });
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    users.splice(userIndex, 1);
    return res.status(200).send({ msg: "Successfully delete user" });
});

app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT}`);
});