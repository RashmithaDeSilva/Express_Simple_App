import { Router } from "express"
import passport from "passport";


const router = Router();


// app.post('/api/auth', (req, res) => {
//     const { body: { username, password } } = req;
//     const user = users.find(u => u.username === username);

//     if(!user || user.password !== password) return res.status(404).send({ mgs: "BAD CREDENTIALS !" });
//     req.session.user = user;
//     return res.status(200).send(user);
// });

router.post('/api/auth', passport.authenticate("local"), (req, res) => {
    res.sendStatus(200);
});

router.get('/api/auth/status', (req, res) => {
    try {
        // console.log(req.session.passport.user);
        // console.log(session);
        return req.user 
            ? res.status(200).send("Done")
            : res.status(401).send({ message: "NOT AUTHENTICATED!" });
    } catch (error) {
        // console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/api/auth/logout', (req, res) => {
    if(!req.user) return res.sendStatus(401);

    req.logOut(e => {
        if(e) return res.sendStatus(400);
        res.sendStatus(200);
    })
});

router.get('/api/auth/discord', passport.authenticate("discord"));

router.get('/api/auth/discord/redirect', passport.authenticate("discord"), (req, res) => {
    
    response.sendStatus(200);
});


export default router;