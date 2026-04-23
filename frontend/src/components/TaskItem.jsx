export const TaskItem = ({ task, onDelete, onToggleStatus, onEdit }) => {
  const isCompleted = task.status === "Completed";

  const handleToggleStatus = () => {
    onToggleStatus(task.id, isCompleted ? "Pending" : "Completed");
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-3 ${isCompleted ? "bg-gray-50 border-gray-300" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggleStatus}
              className="w-5 h-5 cursor-pointer"
            />
            <h4
              className={`text-lg font-medium ${isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}
            >
              {task.title}
            </h4>
          </div>
          {task.description && (
            <p
              className={`mt-2 text-sm ${isCompleted ? "text-gray-400" : "text-gray-600"}`}
            >
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                isCompleted
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {task.status}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
