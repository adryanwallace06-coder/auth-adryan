import express from "express";
import jwt from "jsonwebtoken";
import usuarios from "./usuarios.js";
import planos from "./planos.js";
import user from "./user.js";
import admin from "./admin.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

app.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body;

    const usuario = usuarios.find(
        (user) => user.username === username && user.password === password
    );

    if (usuario) {
        const token = jwt.sign({
                id: usuario.id,
                username: usuario.username,
                role: usuario.role,
            },
            SECRET_KEY, {
                expiresIn: "1h"
            }
        );

        res.status(201).json({
            message: token
        });
    } else {
        res.status(401).json({
            message: "Usuário ou senha inválidos"
        });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // 401 = Não autorizado
    if (!token) {
        return res.status(401).json({
            message: "Token não fornecido"
        });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        // 403 = Proibido
        if (err) {
            return res.status(403).json({
                message: "Token inválido ou expirado"
            });
        }

        req.user = decoded; // guarda os dados do token (id, username, role)
        next(); 
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Acesso restrito a administradores"
        });
    }

    next();
};

app.get("/planos", (req, res) => {
    res.json(planos);
});

app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Acesso concedido a rota protegida" });
});

app.get("/user", authenticateToken, (req, res) => {
    const dados = user.find((u) => u.id === req.user.id);
    res.json(dados);
});

app.get("/admin", authenticateToken, authorizeAdmin, (req, res) => {
    res.json(admin);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
