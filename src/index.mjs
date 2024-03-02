import mongoose from "mongoose";
import { createApp } from "./createApp.mjs";


mongoose.connect('mongodb://192.168.8.139:27017/express_test')
    .then(() => console.log('Connected to Database'))
    .catch(e => console.log(`Error: ${ e } !`));


const app = createApp();
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Runing on Port ${ PORT }`);
});
