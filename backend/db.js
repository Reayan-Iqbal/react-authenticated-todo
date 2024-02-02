const mongoose = require("mongoose");
const { string } = require("zod");

mongoose.connect("your-connection-string");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
});

const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	desc: {
		type: String,
		trim: true,
	},
	completed: { type: Boolean, default: false },
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Todos = mongoose.model("Todos", todosSchema);

module.exports = {
	User,
	Todos,
};
