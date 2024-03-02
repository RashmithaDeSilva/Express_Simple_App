import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from "express-validator";
import { userValidetionSchema, contactnuberValidetionSchema, emailValidetionSchema, passwordValidetionSchema } from "../utils/validationSchemas.mjs";
import { users } from "../db/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";


const router = Router();
// app.use(resolveIndexByUserId); // user midelwear globely


router.get('/api/users', 
    [
        query('filter').isString().withMessage({ value: "FILTER", error: 'Filter not string !' })
        .notEmpty().withMessage({ value: "FILTER", error: 'Filter empty !' })
        .isLength({ min: 3, max: 10 }).withMessage({ value: "FILTER", error: 'Filter must be at least 3 - 10 characters !' }),

        query('value').notEmpty().withMessage({ value: "VALUE", error: 'Value empty !' })
    ], 
    (req, res) => {

    const result = validationResult(req);
    const { query: { filter, value }} = req;

    if(filter === undefined && value === undefined) return res.status(200).send(users);
    if(filter && value) {
        if(users.filter((u) => u[filter].includes(value)).length === 0) return res.status(404).send("Invalide filter or value");
        return res.status(200).send(users.filter((u) => u[filter].includes(value)));
    }
    return res.status(404).send(result.errors.map((e) => e.msg.error));
});

router.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    return res.send(users[userIndex]);
});

// router.post('/api/users', 
//     [   
//         checkSchema(userValidetionSchema), 
//         checkSchema(contactnuberValidetionSchema),
//         checkSchema(emailValidetionSchema),
//     ], 
//     (req, res) => {

//     const result = validationResult(req);
//     const body = matchedData(req);

//     if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
//     return res.status(404).send(result.errors.map((e) => e.msg.error));
    
//     if(
//         (
//             body.contactnuber !== undefined && body.contactnuber !== null 
//             && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length === 0
//         ) 
//         || (
//             body.email && body.email.trim() !== '' 
//             && result.errors.filter((e) => e.msg.value === "EMAIL").length === 0
//         ) 
//         || (
//             body.contactnuber !== undefined && body.contactnuber !== null 
//             && body.email && body.email.trim() !== ''
//             && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length === 0
//             && result.errors.filter((e) => e.msg.value === "EMAIL").length === 0
//         ) 
//     ){

//         const newUser = {
//             id: users[users.length - 1].id + 1, 
//             username: body.username,
//             contactnuber: body.contactnuber,
//             email: body.email
//         }

//         users.push(newUser);
//         return res.status(201).send({ msg: "Successfully added user", newUser });
//     }

//     return res.status(404).send("Email or Contact number is required !");
// });

router.post('/api/users', 
    [   
        checkSchema(userValidetionSchema), 
        checkSchema(contactnuberValidetionSchema),
        checkSchema(emailValidetionSchema),
        checkSchema(passwordValidetionSchema)
    ], 
    async (req, res) => {

    const result = validationResult(req);
    const data = matchedData(req);
        
    if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
    return res.status(404).send(result.errors.map((e) => e.msg.error));

    if(result.errors.filter((e) => e.msg.value === "PASSWORD").length !== 0)
    return res.status(404).send(result.errors.map((e) => e.msg.error));
    
    if(
        (
            data.contactnuber !== undefined && data.contactnuber !== null 
            && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length === 0
        ) 
        || (
            data.email && data.email.trim() !== '' 
            && result.errors.filter((e) => e.msg.value === "EMAIL").length === 0
        ) 
        || (
            data.contactnuber !== undefined && data.contactnuber !== null 
            && data.email && data.email.trim() !== ''
            && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length === 0
            && result.errors.filter((e) => e.msg.value === "EMAIL").length === 0
        ) 
    ){
        
        data.password = hashPassword(data.password);
        const newUser = new User(data);

        try {
            const saveUser = await newUser.save();
            return res.status(201).send({ msg: "Successfully added user", newUser });
    
        } catch(e) {
            return res.status(400).send(e);
        }
    }

    return res.status(404).send("Email or Contact number is required !");
});

router.put("/api/users/:id", 
    [
        resolveIndexByUserId,
        checkSchema(userValidetionSchema), 
        checkSchema(contactnuberValidetionSchema),
        checkSchema(emailValidetionSchema),
    ], 
    (req, res) => {

    const result = validationResult(req);
    const { body, userIndex } = req;

    if(result.errors.length !== 0) return res.status(404).send(result.errors.map((e) => e.msg.error));
    users[userIndex] = { id: users[userIndex].id, ...body }
    return res.status(204).send({ msg: "Successfully update user", body });
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    users[userIndex] = { ...users[userIndex], ...body }
    return res.status(204).send({ msg: "Successfully update user", body });
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    users.splice(userIndex, 1);
    return res.status(200).send({ msg: "Successfully delete user" });
});


export default router;