import express from "express";


const app = express();
app.use(express.json());
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

app.post('/api/users', (req, res) => {
    const { body } = req;

    if(body.username, body.contactnuber, body.email){
        const newUser = {
            id: users[users.length - 1].id + 1, 
            username: body.username,
            contactnuber: body.contactnuber,
            email: body.email
        }

        users.push(newUser);
        return res.status(201).send({ msg: "Successfully added user", newUser });
    }
    return res.status(404).send({ msg: "Invalid inputs !" });
});

app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIndex = users.findIndex((u) => u.id === parsedId);
    if(userIndex === -1) return res.sendStatus(404);

    users[userIndex] = { id: parsedId, ...body }
    return res.status(204).send({ msg: "Successfully update user", body });
});

app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT}`);
});