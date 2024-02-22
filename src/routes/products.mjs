import { Router } from "express";
import { products } from "../db/constants.mjs";


const router = Router();


router.get('/app/products', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies.key);
    res.status(200).send(products);
});


export default router;