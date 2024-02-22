import { Router } from "express";
import { products } from "../db/constants.mjs";


const router = Router();


router.get('/app/products', (req, res) => {
    res.status(200).send(products);
});


export default router;