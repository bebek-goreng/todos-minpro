import { app } from "../server.js";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});