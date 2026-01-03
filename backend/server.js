import express from "express";
import mongoose from "mongoose";
import Router from "./routes/auth.routes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DataBase Was Connected Successful!!")
}).catch((e) => {
    console.log(" DataBase Connection is Failed\nError: ", e.message)
})

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true,}))

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use("/api", Router)

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server was running\nLink: http://localhost:${port}`)
})