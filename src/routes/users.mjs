import { Router } from "express";
import { query, validationResult, body, matchedData } from "express-validator";
import { users } from "../db/constants.mjs";


const router = Router();


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

router.post('/api/users', 
    [
        body('username').notEmpty().withMessage({ value: "USERNAME", error: 'User name canot empty !' })
        .isString().withMessage({ value: "USERNAME", error: 'User name not string !' })
        .isLength({ min: 3, max: 10 }).withMessage({ value: "USERNAME", error: 'User name must be at least 3 - 10 characters !' }),

        body('contactnuber').isInt().withMessage({ value: "CONTACTNUMBER", error: 'Contactnuber not int !' })
        .isLength({ min: 10, max: 11}).withMessage({ value: "CONTACTNUMBER", error: 'Contactnuber ust be at least 10 - 11 numbers !' }),

        body('email').isString().withMessage({ value: "EMAIL", error: 'Email not string !' })
        .isLength({ min: 10, max: 50 }).withMessage({ value: "EMAIL", error: 'Email must be at least 10 - 50 characters !' })
    ], 
    (req, res) => {

    const result = validationResult(req);
    const body = matchedData(req);

    if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
    return res.status(404).send(result.errors.map((e) => e.msg.error));
    
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


export default router;