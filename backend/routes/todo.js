const express = require("express");
const zod = require("zod");
const { Todos } = require("../db");
const { authMiddleware } = require("../middleware");
const todoRouter = express.Router();
todoRouter.use(authMiddleware);

const addTodoSchema = zod.object({
	title: zod.string(),
	desc: zod.string(),
});
todoRouter.post("/addTodo", async (req, res) => {
	const { title, desc } = req.body;
	const { success } = addTodoSchema.safeParse({
		title,
		desc,
	});
	if (!success) {
		return res.status(400).json({
			message: "Invalid Inputs",
		});
	}
	try {
		const result = await Todos.create({
			title,
			desc,
			userId: req.userId,
		});
		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

todoRouter.get("/", async (req, res) => {
	const userId = req.userId;
	try {
		const response = await Todos.find({ userId }, "title desc completed");
		res.json({
			message: response,
		});
	} catch (error) {
		console.log(error);
		res.status(411).json({
			message: "Internal Server Error.",
		});
	}
});

todoRouter.put("/updateTodo", async (req, res) => {
	const todoId = req.query.todoId || "";
	if (!todoId) {
		return req.status(404).json({
			message: "No todo Id given",
		});
	}
	try {
		await Todos.findByIdAndUpdate(todoId, {
			title: req.body.title,
			desc: req.body.desc,
			completed: req.body.completed,
		});
		res.json({
			message: "Updated Successfuly",
		});
	} catch (error) {
		res.status(404).json({
			message: "Todo Id not Found",
		});
	}
});

todoRouter.delete("/delete", async (req, res) => {
	const todoId = req.query.todoId || "";
	try {
		const result = await Todos.findByIdAndDelete(todoId);
		res.json({
			message: "Todo Deleted Successfuly",
		});
	} catch (error) {
		res.status(404).json({
			message: "Todo Id Does not exist",
		});
	}
});

module.exports = {
	todoRouter,
};
