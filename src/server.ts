import express from "express";
import "express-async-errors";

import "./database";
import { router } from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}...`));
