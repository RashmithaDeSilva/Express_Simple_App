import express from "express";
import { query, validationResult, body } from "express-validator";


const app = express();
app.use(express.json());
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

app.get('/api/users', 
    query('filter').isString().withMessage("Not string !")
    .notEmpty().withMessage("Empty !")
    .isLength({ min: 3, max: 10 }).withMessage("Must be at least 3 - 10 characters !"), 
    (req, res) => {

    const result = validationResult(req);
    const { query: { filter, value }} = req;
    if(filter && value) return res.status(200).send(users.filter((u) => u[filter].includes(value)));
    return res.status(200).send(users);
});

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    return res.send(users[userIndex]);
});

app.post('/api/users', 
    [
        body('username').notEmpty().withMessage({ value: "USERNAME", error: 'Canot empty !' })
        .isString().withMessage({ value: "USERNAME", error: 'Not string !' })
        .isLength({ min: 3, max: 10 }).withMessage({ value: "USERNAME", error: 'Must be at least 3 - 10 characters !' }),

        body('contactnuber').isInt().withMessage({ value: "CONTACTNUMBER", error: 'Not int !' })
        .isLength({ min: 10, max: 11}).withMessage({ value: "CONTACTNUMBER", error: 'Ust be at least 10 - 11 numbers !' }),

        body('email').isString().withMessage({ value: "EMAIL", error: 'Not string !' })
        .isLength({ min: 10, max: 50 }).withMessage({ value: "EMAIL", error: 'Must be at least 10 - 50 characters !' })
    ], 
    (req, res) => {

    const result = validationResult(req);
    console.log(result.errors.filter((e) => e.msg.value === "USERNAME"));
    const { body } = req;

    if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
    return res.status(404).send(result.errors.map((e) => e.msg.error));

    console.log();
    
    if(
        (
            body.contactnuber !== undefined && body.contactnuber !== null 
            && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length === 0
        ) 
        || (
            body.email && body.email.trim() !== '' 
            && result.errors.filter((e) => e.msg.value === "EMAIL").length === 0
        ) 
        || (
            body.contactnuber !== undefined && body.contactnuber !== null 
            && body.email && body.email.trim() !== ''
            && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length === 0
            && result.errors.filter((e) => e.msg.value === "EMAIL").length === 0
        ) 
    ){

        const newUser = {
            id: users[users.length - 1].id + 1, 
            username: body.username,
            contactnuber: body.contactnuber,
            email: body.email
        }

        users.push(newUser);
        return res.status(201).send({ msg: "Successfully added user", newUser });
    }

    return res.status(404).send("Email or Contact number is required !");
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