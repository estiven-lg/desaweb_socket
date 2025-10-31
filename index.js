import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));

app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
    },
});


io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});


app.post("/emit", (req, res) => {
    const { evento, data } = req.body;
    console.log(`Recibido evento ${evento} con datos:`, data);
    try {
        io.emit(evento, data);
        res.json({ status: "Evento emitido", evento });
    } catch (error) {
        console.error("Error al emitir evento:", error);
        res.status(500).json({ status: "Error al emitir evento", error: error.message });
    }
});



const NODE_ENV = process.env.NODE_ENV || "development";

server.listen(3000, () => {
    console.log(`Socket.IO server corriendo en puerto 3000 (${NODE_ENV})`);
});