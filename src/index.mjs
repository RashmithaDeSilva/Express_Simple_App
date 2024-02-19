import express from "express";


const app = express();
const PORT = process.env.PORT || 8000;
const users = [
    { id: 1, username: "alen", contactnuber: 94712345689, email: "alen@gmail.com" },
    { id: 2, username: "jone", contactnuber: 94712345689, email: "jone@gmail.com" },
    { id: 3, username: "same", contactnuber: 94712345689, email: "same@gmail.com" },
    { id: 4, username: "smith", contactnuber: 94712345689, email: "smith@gmail.com" },
    { id: 5, username: "alisa", contactnuber: 94712345689, email: "alisa@gmail.com" },
];


app.get('/', (req, res) => {
    res.status(200).send("Hello express !");
});

app.get('/api/users', (req, res) => {
    const { query: { filter, value }} = req;
    if(filter && value) return res.status(200).send(users.filter((u) => u[filter].includes(value)));
    return res.status(200).send(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.status(400).send({msg: "Bad Request. Invalid ID !"});

    const user = users.find((user) => user.id === id);
    if(!user) return res.sendStatus(404);
    return res.status(200).send(user);
});

app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT}`);
});