import { Router } from "express";
import usersRoter from "./users.mjs";
import productsRoter from "./products.mjs"


const router = Router();
router.use(usersRoter);
router.use(productsRoter);


export default router;