// components/AddTodoForm.js
import React, { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ toggleUpdate }) => {
	const [todoTitle, setTodoTitle] = useState("");
	const [todoDescription, setTodoDescription] = useState("");

	const handleSubmit = (e) => {
		toggleUpdate();
		e.preventDefault();
		setTodoTitle("");
		setTodoDescription("");
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<input
				type="text"
				placeholder="Add new todo"
				value={todoTitle}
				required={true}
				onChange={(e) => setTodoTitle(e.target.value)}
				className="w-full px-3 py-2 mb-2 rounded border"
			/>
			<textarea
				placeholder="Description"
				value={todoDescription}
				onChange={(e) => setTodoDescription(e.target.value)}
				className="w-full px-3 py-2 mb-2 rounded border"
				rows="4" // Adjust the number of rows as needed
			/>
			<button
				type="submit"
				onClick={async () => {
					try {
						await axios.post(
							"http://localhost:3000/api/v1/todos/addTodo",
							{
								title: todoTitle,
								desc: todoDescription,
							},
							{
								headers: {
									Authorization: "Bearer " + localStorage.getItem("token"),
								},
							}
						);
						setTodoTitle("");
					} catch (error) {
						console.log(error);
					}
				}}
				className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Add Todo
			</button>
		</form>
	);
};

export default AddTodoForm;
