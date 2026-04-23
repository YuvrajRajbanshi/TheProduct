import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  isLoading,
  onDelete,
  onToggleStatus,
  onEdit,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">
          No tasks yet. Create one to get started!
        </p>
      </div>
    );
  }

  const pendingTasks = tasks.filter((t) => t.status === "Pending");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <div>
      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pending Tasks ({pendingTasks.length})
          </h3>
          {pendingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Completed Tasks ({completedTasks.length})
          </h3>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
