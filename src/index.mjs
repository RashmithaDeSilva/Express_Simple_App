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
const products = [
    { id: 1, productname: "VGA", price: 1499.99, qty: 30 },
    { id: 2, productname: "RAM", price: 300, qty: 50 },
    { id: 3, productname: "CPU", price: 600, qty: 20 },
    { id: 4, productname: "UPS", price: 499.99, qty: 10 },
    { id: 5, productname: "PSU", price: 400, qty: 30 },
];


app.get('/', (req, res) => {
    res.status(200).send("Hello express !");
});

app.get('/api/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/api/products', (req, res) => {
    res.status(200).send(products);
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