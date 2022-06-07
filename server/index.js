const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoute");
const cors = require("cors");
const mongoose = require("mongoose");

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

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

app.set("port", process.env.PORT);
app.set("baseUrl", "http://localhost");
const server = app.listen(app.get("port"), () => {
	console.log(
		`Le serveur est lancé sur : ${app.get("baseUrl")}:${server.address().port}`
	);
});
