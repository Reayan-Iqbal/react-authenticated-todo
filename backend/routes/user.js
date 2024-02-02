const express = require("express");
const { User } = require("../db");
const userRoutes = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupSchema = zod.object({
	username: zod.string().email(),
	password: zod.string().min(6),
	firstName: zod.string(),
	lastName: zod.string(),
});
userRoutes.post("/signup", async (req, res) => {
	const { success } = signupSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({
			message: "Invalid Inputs",
		});
	}
	const existingUser = await User.findOne({ username: req.body.username });
	if (existingUser) {
		return res.status(403).json({
			message: "An account with this email already exists.",
		});
	}
	try {
		const user = await User.create(req.body);
		console.log(user);
		const userId = user._id;
		const token = jwt.sign({ userId }, JWT_SECRET);
		res.json({
			message: "User Created Successfully",
			token: token,
		});
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
});

const signinSchema = zod.object({
	username: zod.string().email(),
	password: zod.string(),
});
userRoutes.post("/signin", async (req, res) => {
	const inputCred = {
		username: req.body.username,
		password: req.body.password,
	};
	const { success } = signinSchema.safeParse(inputCred);
	if (!success) {
		res.status(411).json({
			message: "Error while logging in",
		});
	}
	const user = await User.findOne(inputCred);
	if (!user) {
		res.status(411).json({
			message: "Incorrect Credentials!",
		});
	} else {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);
		res.json({
			message: "Signed In Successfully",
			token: token,
		});
	}
});

module.exports = {
	userRoutes,
};
