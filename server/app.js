import express from "express";
import dotenv from "dotenv";
import itemRouter from "./router/itemRouter.js";
import loginRouter from "./router/loginRouter.js";
import { connectDb } from "./config/connection.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use('/uploads', express.static('uploads'));
connectDb();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/data", loginRouter); 
app.use("/data", itemRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
