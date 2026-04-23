import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { taskAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.data || []);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");
      const response = await taskAPI.createTask(data);
      setTasks([response.data.data, ...tasks]);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");
      const response = await taskAPI.updateTask(editingTask.id, data);
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? response.data.data : t)),
      );
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(id);
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete task");
      }
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const response = await taskAPI.updateTask(id, { status: newStatus });
      setTasks(tasks.map((t) => (t.id === id ? response.data.data : t)));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update task status");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-sm text-gray-600">
              Welcome, {user?.name || "User"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            {showForm ? (
              <div>
                <TaskForm
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  initialData={editingTask}
                  isLoading={isSubmitting}
                />
                <button
                  onClick={handleCancelEdit}
                  className="mt-3 w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
              >
                + New Task
              </button>
            )}
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Your Tasks
              </h2>
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEditTask}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-600 text-sm">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter((t) => t.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter((t) => t.status === "Completed").length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
