import React, { useState } from "react";

const TodoModal = ({ todo, isOpen, onClose, onSave }) => {
	const [title, setTitle] = useState(todo.title);
	const [desc, setDesc] = useState(todo.desc);
	const [completed, setCompleted] = useState(todo.completed);
	const todoId = todo._id;
	const handleSave = () => {
		onSave({ title, desc, completed, todoId });
		onClose();
	};

	return (
		<>
			{isOpen && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg w-1/2">
						<h2 className="text-xl font-bold mb-4">Edit Todo</h2>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full mb-2 px-3 py-2 rounded border"
						/>
						<textarea
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							className="w-full mb-2 px-3 py-2 rounded border"
							rows="4"
						/>
						<label className="flex items-center mb-2">
							<input
								type="checkbox"
								checked={completed}
								onChange={(e) => setCompleted(e.target.checked)}
								className="mr-2"
							/>
							Completed
						</label>
						<div className="flex justify-end">
							<button
								onClick={onClose}
								className="mr-2 px-4 py-2 border rounded"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default TodoModal;
