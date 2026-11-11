import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import usuarios from "./usuarios.js";
import planos from "./planos.js";
import user from "./user.js";
import admin from "./admin.js";

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
app.use(express.json());




app.listen(PORT, () => {
    console.log(`Medica+ rodando na porta ${PORT}`)
});