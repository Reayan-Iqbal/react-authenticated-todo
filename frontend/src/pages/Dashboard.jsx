import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useState } from "react";

export const Dashboard = () => {
	const [updateFlag, setUpdateFlag] = useState(false);

	const toggleUpdate = () => {
		setUpdateFlag((prevState) => !prevState);
	};
	const navigate = useNavigate();
	if (!localStorage.getItem("token")) {
		navigate("/signin");
	}
	// console.log(localStorage.getItem("token"));
	return (
		<div>
			<Appbar />
			{/* <AddTodoForm /> */}
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">To-Do List</h1>
				<AddTodoForm toggleUpdate={toggleUpdate} />
				<TodoList updateFlag={updateFlag} toggleUpdate={toggleUpdate} />
				{/* <Users /> */}
			</div>
		</div>
	);
};
