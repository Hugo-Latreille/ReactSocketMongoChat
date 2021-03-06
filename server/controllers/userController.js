const User = require("./../model/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const usernameCheck = await User.findOne({ username });
		if (usernameCheck) {
			return res.json({ msg: "Username already used", status: false });
		}

		const emailCheck = await User.findOne({ email });
		if (emailCheck)
			return res.json({ msg: "Email already used", status: false });
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			email,
			username,
			password: hashedPassword,
		});
		delete user.password;
		return res.json({ status: true, user });
	} catch (error) {
		console.error(error);
		next(error);
	}
};

module.exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user)
			return res.json({ msg: "Incorrect Username or Password", status: false });
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid)
			return res.json({ msg: "Incorrect Username or Password", status: false });
		delete user.password;
		return res.json({ status: true, user });
	} catch (ex) {
		next(ex);
	}
};

module.exports.setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const avatarImage = req.body.image;
		const userData = await User.findByIdAndUpdate(
			userId,
			{
				isAvatarImageSet: true,
				avatarImage,
			},
			{ new: true }
		);
		return res.json({
			isSet: userData.isAvatarImageSet,
			image: userData.avatarImage,
		});
	} catch (ex) {
		next(ex);
	}
};

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const id = req.params.id;
		const users = await User.find({ _id: { $ne: id } }).select([
			"email",
			"username",
			"avatarImage",
			"_id",
		]);
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		next(error);
	}
};
