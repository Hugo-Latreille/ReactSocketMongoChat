const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);

app.use(express.static(path.resolve(__dirname, "./../public/build")));

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
//MONGO_URL=mongodb://localhost/chat

const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:3000",
			`https://reactsocketchat.herokuapp.com/`,
			`https://chat.hugolatreille.dev`,
		],
		credentials: true,
	},
});

const users = {};
io.on("connection", (socket) => {
	socket.on("add-user", (userId) => {
		users[userId] = socket.id;
		console.log(users);
	});
	socket.on("send-msg", (data) => {
		console.log({ data });
		const senderSocketId = users[data.to];
		console.log(senderSocketId);
		if (senderSocketId) {
			socket.to(senderSocketId).emit("msg-receive", data.message);
		}
	});
});

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

// app.set("port", process.env.PORT || 8888);
// app.set("baseUrl", "http://localhost");

// server.listen(app.get("port"), () => {
// 	console.log(
// 		`Le serveur est lancé sur : ${app.get("baseUrl")}:${server.address().port}`
// 	);
// });

if (typeof PhusionPassenger !== "undefined") {
	PhusionPassenger.configure({ autoInstall: false });
}

if (typeof PhusionPassenger !== "undefined") {
	app.listen("passenger");
} else {
	app.listen(3000);
}
