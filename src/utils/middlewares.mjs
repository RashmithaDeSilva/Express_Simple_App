import { users } from "../db/constants.mjs";


export const resolveIndexByUserId = (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIndex = users.findIndex((u) => u.id === parsedId);
    if(userIndex === -1) return res.sendStatus(404);

    req.userIndex = userIndex;
    next();
};