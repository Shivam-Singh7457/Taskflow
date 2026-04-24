import { useState, useEffect, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import PomodoroTimer from '../components/PomodoroTimer';
import { Plus, Maximize, X } from 'lucide-react';
import CompletionModal from '../components/CompletionModal';

export default function DashboardPage() {
  const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalError, setModalError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;
    switch (filter) {
      case 'pending': result = tasks.filter(t => t.status === 'pending'); break;
      case 'completed': result = tasks.filter(t => t.status === 'completed'); break;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return result;
  }, [tasks, filter, searchQuery]);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    high: tasks.filter(t => t.status === 'pending' && t.priority === 'high').length
  }), [tasks]);

  const handleSaveTask = async (taskData) => {
    try {
      setModalError('');
      setIsSaving(true);
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTaskUpdate = (id, updates) => {
    const task = tasks.find(t => t.id === id);
    // Only intercept if we are marking a PENDING task as COMPLETED
    if (updates.status === 'completed' && task.status === 'pending') {
      setTaskToComplete(task);
      setIsCompletionModalOpen(true);
    } else {
      updateTask(id, updates);
    }
  };

  const confirmCompletion = async () => {
    if (taskToComplete) {
      await updateTask(taskToComplete.id, { status: 'completed' });
      setIsCompletionModalOpen(false);
      setTaskToComplete(null);
    }
  };

  const handleTaskDelete = (task) => {
    setTaskToDelete(task);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const openNewTask = () => {
    setEditingTask(null);
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setModalError('');
    setIsModalOpen(true);
  };

  if (focusMode) {
    const focusTask = tasks
      .filter(t => t.status === 'pending' && t.priority === 'high')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || 
      tasks.filter(t => t.status === 'pending')[0]; // fallback if no high priority

    return (
      <div className="min-h-screen bg-peach-50 flex flex-col items-center justify-center p-8 relative">
        <button 
          onClick={() => setFocusMode(false)}
          className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-cream-50 text-ink-mid border border-cream-200 rounded-lg hover:text-ink hover:border-peach-400 transition-colors"
        >
          <X className="w-4 h-4" /> Exit Focus
        </button>

        <h2 className="text-3xl font-bold text-ink mb-12">Focus Stream</h2>

        {focusTask ? (
          <div className="w-full max-w-[480px]">
            <TaskCard 
              task={focusTask} 
              onUpdate={handleTaskUpdate} 
              onDelete={handleTaskDelete}
              onEdit={openEditTask}
            />
            <PomodoroTimer />
          </div>
        ) : (
          <div className="text-center text-ink-mid">
            <p>You have no pending tasks. Great job!</p>
          </div>
        )}
      </div>
    );
  }

  const filterTitles = {
    all: 'All Tasks',
    pending: 'Pending Tasks',
    completed: 'Completed Tasks'
  };

  return (
    <div className="min-h-screen flex bg-peach-50">
      <Sidebar filter={filter} setFilter={setFilter} stats={stats} />

      <main className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
        <header className="h-[72px] shrink-0 bg-cream-50 border-b border-cream-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xl font-bold text-ink shrink-0">{filterTitles[filter]}</h2>
            <div className="relative max-w-md w-full">
              <input 
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream-100 border border-cream-200 rounded-full py-2 px-10 text-sm focus:outline-none focus:border-peach-400 transition-colors"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-mid hover:text-peach-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setFocusMode(true)}
              className="flex items-center gap-2 px-4 py-2 border border-peach-400 text-peach-600 font-medium rounded-lg hover:bg-peach-100 transition-colors"
            >
              <Maximize className="w-4 h-4" /> Focus Stream
            </button>
            <button 
              onClick={openNewTask}
              className="flex items-center gap-2 px-4 py-2 bg-peach-400 text-peach-50 font-medium rounded-lg hover:bg-peach-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> New Task
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {filteredTasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-ink-mid">
              <p>No tasks found in this view.</p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 items-start content-start">
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onUpdate={handleTaskUpdate} 
                  onDelete={handleTaskDelete}
                  onEdit={openEditTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        error={modalError}
        loading={isSaving}
      />

      <CompletionModal 
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onConfirm={confirmCompletion}
        taskTitle={taskToComplete?.title}
      />

      {taskToDelete && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 w-full max-w-[400px] shadow-2xl border border-cream-200">
            <h3 className="text-lg font-bold text-ink mb-2">Delete Task?</h3>
            <p className="text-ink-mid text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-peach-600">"{taskToDelete.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setTaskToDelete(null)}
                className="flex-1 px-4 py-2.5 bg-cream-200 text-ink font-medium rounded-xl hover:bg-cream-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
