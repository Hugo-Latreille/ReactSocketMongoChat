const Message = require("./../model/messageModels");

module.exports.addMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		console.log(req.body);

		const data = await Message.create({
			message: { text: message },
			users: [from, to],
			sender: from,
		});
		if (data) {
			return res.json({ msg: "Message créé avec succès" });
		}

		return res.json({
			msg: "Échec de l'ajout du message à la base de données",
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};
module.exports.getAllMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;

		const messages = await Message.find({ users: { $all: [from, to] } }).sort({
			updatedAt: 1,
		});

		const projectMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text,
			};
		});
		res.json(projectMessages);
	} catch (error) {
		console.error(error);
		next(error);
	}
};
