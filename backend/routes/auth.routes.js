import express from "express";
import verifyJWT from "../middlewares/auth.middelware.js";
import {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
} from "../controllers/auth.controller.js";

import uploadPdf from "../middlewares/multer.middleware.js";
import { getResponse } from "../controllers/resume.controller.js";

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.put("/update", verifyJWT, updateUser);
Router.delete("/delete", verifyJWT, deleteUser);
Router.post(
    "/analyze",
    uploadPdf.single("resume"),
    getResponse
);

export default Router;