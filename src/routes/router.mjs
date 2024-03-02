import { Router } from "express";
import usersRoter from "./users.mjs";
import productsRoter from "./products.mjs"
import authRoter from "./auth.mjs"


const router = Router();
router.use(usersRoter);
router.use(productsRoter);
router.use(authRoter);


router.get('/', (req, res) => {
    req.session.visited = true;
    res.status(200).send("Hello express !");
});

router.get('/api', (req, res) => {
    res.redirect("/");
});


export default router;