import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoList = ({ updateFlag, toggleUpdate }) => {
	const [todos, setTodos] = useState([]);
	try {
		useEffect(() => {
			const fetchTodos = async () => {
				const response = await axios.get(
					"http://localhost:3000/api/v1/todos/",
					{
						headers: {
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					}
				);
				setTodos(response.data.message);
			};
			fetchTodos();
		}, [updateFlag]);
	} catch (error) {
		console.log(error);
	}
	return (
		<div>
			{todos.map((todo) => {
				return (
					<TodoItem key={todo._id} toggleUpdate={toggleUpdate} todo={todo} />
				);
			})}
		</div>
	);
};

export default TodoList;
