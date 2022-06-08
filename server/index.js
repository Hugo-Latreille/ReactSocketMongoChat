const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

app.use(cors("*"));
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connexion à la base de donnée");
	})
	.catch((error) => console.error(error));

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		credentials: true,
	},
});

io.on("connection", async (socket) => {
	socket.on("add-user", (userId) => {});
});

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

app.set("port", process.env.PORT);
app.set("baseUrl", "http://localhost");

server.listen(app.get("port"), () => {
	console.log(
		`Le serveur est lancé sur : ${app.get("baseUrl")}:${server.address().port}`
	);
});
