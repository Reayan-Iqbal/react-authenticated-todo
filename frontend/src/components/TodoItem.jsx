import React, { useState } from "react";
import TodoModal from "./TodoModal";
import axios from "axios";

const TodoItem = ({ todo, toggleUpdate }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};
	const handleSaveTodo = async (updatedTodo) => {
		const { todoId, title, desc, completed } = updatedTodo;
		const newTodo = {
			title,
			desc,
			completed,
		};
		try {
			await axios.put(
				"http://localhost:3000/api/v1/todos/updateTodo?todoId=" + todoId,
				newTodo,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
	const handelDelete = async () => {
		const todoId = todo._id;
		try {
			await axios.delete(
				"http://localhost:3000/api/v1/todos/delete?todoId=" + todoId,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			toggleUpdate();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="flex justify-between">
				<div
					className="flex flex-grow"
					onClick={handleModalOpen}
					style={{ cursor: "pointer" }}
				>
					<div className="flex flex-col rounded-l-full mb-4 justify-center h-ful p-4 text-xl bg-blue-200 w-full">
						<div>{todo.title}</div>
					</div>
				</div>

				<div className="flex flex-col rounded-r-full mb-4 p-4 bg-red-300 justify-center h-ful">
					<button
						onClick={handelDelete}
						className="text-red-500  hover:text-red-700"
					>
						Delete
					</button>
				</div>
			</div>
			<TodoModal
				todo={todo}
				isOpen={isModalOpen}
				onClose={handleModalClose}
				onSave={handleSaveTodo}
			/>
		</>
	);
};

export default TodoItem;
